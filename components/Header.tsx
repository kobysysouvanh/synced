"use client";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";

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
      className='w-full sticky top-0 z-50 bg-white/40 backdrop-blur shadow-lg shadow-black/5'
    >
      <nav className="h-16 flex justify-between items-center px-6 md:px-8 max-w-[90rem] mx-auto">
        <Link href="/" className="flex items-center justify-center gap-3">
          <Logo/>
        </Link>
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
          <div className="flex items-center justify-center space-x-6">
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
                  label="Dashboard"
                  labelIcon={<UserRound className="w-4 h-4" />}
                  onClick={() => router.push("/dashboard")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </div>
        </SignedIn>
      </nav>
    </div>
  );
};
export default Header;
