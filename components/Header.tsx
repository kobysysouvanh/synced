"use client";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <div className="hidden sm:inline-block space-x-2">
          <Button
            variant={"ghost"}
            className="hover:bg-transparent"
            size={"lg"}
          >
            Sign Up
          </Button>
          <Button size={"lg"}>Log In</Button>
        </div>
      </div>
    </div>
  );
};
export default Header;
