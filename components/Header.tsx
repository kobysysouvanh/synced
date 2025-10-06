"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import { Button } from "./ui/button";

const Header = () => {
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - (window.innerHeight / 2) + (element.offsetHeight / 2);
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='w-full max-w-7xl fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-2'>
      <nav className="h-16 flex justify-between items-center px-6 md:px-8 mx-auto bg-white/40 backdrop-blur shadow-lg shadow-black/5 rounded-xl">
        <Link href="/" className="">
          <Logo/>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          <button onClick={() => scrollToSection('features')} className="hover:text-slate-900 transition-colors hover:cursor-pointer">Features</button>
          <button onClick={() => scrollToSection('how')} className="hover:text-slate-900 transition-colors hover:cursor-pointer">How it works</button>
          <button onClick={() => scrollToSection('preview')} className="hover:text-slate-900 transition-colors hover:cursor-pointer">Preview</button>
          <button onClick={() => scrollToSection('pricing')} className="hover:text-slate-900 transition-colors hover:cursor-pointer">Pricing</button>
          <button onClick={() => scrollToSection('faq')} className="hover:text-slate-900 transition-colors hover:cursor-pointer">FAQ</button>
        </div>
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
