"use client";

import { Check, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/db/supabase";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { SupabaseRealtimePayload } from "@/lib/types";

export function CodeGenerator() {
  const { user } = useUser();
  const [code, setCode] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // OTP Input states
  const [otpValue, setOtpValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Generate a new code via API call
  const generateNewCode = async () => {
    try {
      const response = await fetch("/api/couples/code", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setCode(data.code);
        return data.code;
      } else {
        console.error("Error generating code:", data.error);
        toast.error(data.error || "Failed to generate code");
        return null;
      }
    } catch (error) {
      console.error("Error generating code:", error);
      toast.error("Failed to generate code");
      return null;
    }
  };

  // Start code generation
  const startCodeGeneration = async () => {
    const newCode = await generateNewCode();
    if (newCode) {
      setTimeLeft(30);
      setIsActive(true);
    }
  };

  // Stop code generation
  const stopCodeGeneration = () => {
    setIsActive(false);
    setCode("");
    setTimeLeft(30);
  };

  // Copy code to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Code copied to clipboard");
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  // Handle form submission
  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otpValue.length !== 5) {
      toast.error("Please enter all 5 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/couples/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: otpValue.toUpperCase() }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Coupled Successfully! 🎉");
        setOtpValue("");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(`${data.error || "Coupling failed"}`);
      }
    } catch (error) {
      toast.error("Coupling failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Real-time coupling detection for code generator
  useEffect(() => {
    if (!user || !isActive) return;

    const channel = supabase
      .channel("coupling_detection")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "couples",
        },
        (payload: SupabaseRealtimePayload) => {
          // Check if this user was involved in the coupling
          const record = payload.new;
          if (record && record.user1_id === user.id) {
            console.log("Got coupled as code generator!", payload);
            toast.success("You've been coupled! 🎉");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, isActive, user]);

  // Timer and code regeneration effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(async () => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Generate a new code via API to ensure it's stored in database
            generateNewCode();
            return 30;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const progressPercentage = (timeLeft / 30) * 100;
  const isOtpComplete = otpValue.length === 5;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto mt-4 md:mt-0 space-y-6">
      <h2 className="text-2xl font-bold text-center">
        💕 Connect with Partner
      </h2>

      {/* Generate Code Section */}
      <div className="pb-6">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Generate Code
        </h3>

        <div className="text-center space-y-4">
          <p className="text-gray-600 text-sm">
            {!isActive
              ? "Generate a code for your partner to enter"
              : "Share this code with your partner:"}
          </p>

          {/* Code Display - Always visible */}
          <div className="relative">
            <div className="text-3xl font-mono font-bold tracking-widest text-purple-500 bg-gray-50 py-3 px-4 rounded-lg border-2 border-dashed border-purple-300 min-h-[60px] flex items-center justify-center">
              {code}
            </div>

            {/* Copy Button - Only show when code exists */}
            {code && (
              <Button
                onClick={copyToClipboard}
                variant="ghost"
                size="sm"
                className="absolute top-1 right-1 hover:bg-neutral-300"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>

          {/* Timer Progress Bar - Only show when active */}
          {isActive && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Code expires in:</span>
                <span className="font-semibold">{timeLeft}s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-center">
            {!isActive ? (
              <Button
                onClick={startCodeGeneration}
                className="bg-purple-500 hover:bg-purple-600 px-8"
                size="lg"
              >
                Generate Connection Code
              </Button>
            ) : (
              <Button
                onClick={stopCodeGeneration}
                variant="secondary"
                className="px-8"
              >
                Cancel
              </Button>
            )}
          </div>

          {/* Auto-regeneration notice - Only show when active */}
          {isActive && (
            <p className="text-xs text-gray-500">
              Code regenerates every 30 seconds automatically
            </p>
          )}
        </div>
      </div>

      {/* OR Divider */}
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 font-medium">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Enter Code Section - OTP Style */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">
          {`Enter Partner's Code`}
        </h3>

        <form onSubmit={handleCodeSubmit} className="space-y-6">
          {/* OTP Input */}
          <div className="flex justify-center">
            <InputOTP
              maxLength={5}
              value={otpValue}
              onChange={(value) => setOtpValue(value.toUpperCase())}
              pattern="[A-Z0-9]*"
            >
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className="w-12 h-12 text-xl border-gray-400 focus:border-purple-500"
                />
                <InputOTPSlot
                  index={1}
                  className="w-12 h-12 text-xl border-gray-400 focus:border-purple-500"
                />
                <InputOTPSlot
                  index={2}
                  className="w-12 h-12 text-xl border-gray-400 focus:border-purple-500"
                />
                <InputOTPSlot
                  index={3}
                  className="w-12 h-12 text-xl border-gray-400 focus:border-purple-500"
                />
                <InputOTPSlot
                  index={4}
                  className="w-12 h-12 text-xl border-gray-400 focus:border-purple-500"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 mb-4">
              Enter the 5-character code from your partner
            </p>

            <Button
              type="submit"
              disabled={loading || !isOtpComplete}
              className="w-full bg-purple-500 hover:bg-purple-600"
            >
              {loading ? "Connecting..." : "Connect"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
