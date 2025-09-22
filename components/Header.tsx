"use client";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UserRound } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10); // Change background after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/40 backdrop-blur-xl  shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center p-4 max-w-[90rem] mx-auto">
        <h1 className="font-bold text-4xl tracking-[60%] text-neutral-900">
          SYNCED
        </h1>
        <SignedOut>
          <div className="hidden sm:inline-block space-x-2">
            <Button
              variant={"ghost"}
              className="hover:bg-transparent"
              size={"lg"}
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </Button>
            <Button size={"lg"} onClick={() => router.push("/sign-in")}>
              Log In
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: "2.5rem",
                  height: "2.5rem",
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Profile"
                labelIcon={<UserRound className="w-4 h-4" />}
                onClick={() => router.push("/profile")}
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>
    </div>
  );
};
export default Header;
