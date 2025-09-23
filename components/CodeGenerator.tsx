"use client";

import { Check, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/db/supabase'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { SupabaseRealtimePayload } from "@/lib/types";

export function CodeGenerator() {
  const { user } = useUser()
  const [code, setCode] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // OTP Input states
  const [otpValue, setOtpValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Generate a random 5-character code
  const generateCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Excluding confusing chars
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Start code generation
  const startCodeGeneration = async () => {
    try {
      const response = await fetch("/api/couples/code", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setCode(data.code);
        setTimeLeft(30);
        setIsActive(true);
      } else {
        console.error("Error generating code:", data.error);
        toast.error(data.error || "Failed to generate code");
      }
    } catch (error) {
      console.error("Error generating code:", error);
      toast.error("Failed to generate code");
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
    if (!user || !isActive) return

    const channel = supabase
      .channel('coupling_detection')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'couples'
        },
        (payload: SupabaseRealtimePayload) => {
          // Check if this user was involved in the coupling
          const record = payload.new
          if (record && record.user1_id === user.id) {
            console.log('Got coupled as code generator!', payload)
            toast.success("You've been coupled! 🎉")
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user?.id, isActive, user])

  // Timer and code regeneration effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setCode(generateCode());
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
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">
        💕 Connect with Partner
      </h2>

      {/* Generate Code Section */}
      <div className="border-b pb-6">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Generate Code
        </h3>

        {!isActive ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4 text-sm">
              Generate a code for your partner to enter
            </p>
            <Button
              onClick={startCodeGeneration}
              className="w-full bg-purple-500 hover:bg-purple-600"
              size="lg"
            >
              Generate Connection Code
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Share this code with your partner:
            </p>

            {/* Code Display */}
            <div className="relative">
              <div className="text-3xl font-mono font-bold tracking-widest text-purple-500 bg-gray-50 py-3 px-4 rounded-lg border-2 border-dashed border-purple-300">
                {code}
              </div>

              {/* Copy Button */}
              <Button
                onClick={copyToClipboard}
                variant="ghost"
                size="sm"
                className="absolute top-1 right-1"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Timer Progress Bar */}
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

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={stopCodeGeneration}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={startCodeGeneration}
                variant="default"
                className="flex-1 bg-purple-500 hover:bg-purple-600"
              >
                New Code
              </Button>
            </div>

            <p className="text-xs text-gray-500">
              Code regenerates every 30 seconds automatically
            </p>
          </div>
        )}
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
                <InputOTPSlot index={0} className="w-12 h-12 text-xl border-gray-400 focus:border-purple-500" />
                <InputOTPSlot index={1} className="w-12 h-12 text-xl border-gray-400 focus:border-purple-500" />
                <InputOTPSlot index={2} className="w-12 h-12 text-xl border-gray-400 focus:border-purple-500" />
                <InputOTPSlot index={3} className="w-12 h-12 text-xl border-gray-400 focus:border-purple-500" />
                <InputOTPSlot index={4} className="w-12 h-12 text-xl border-gray-400 focus:border-purple-500" />
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