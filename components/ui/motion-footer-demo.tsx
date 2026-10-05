"use client";

import React from "react";
import { CinematicFooter } from "@/components/ui/motion-footer";

export function CinematicFooterDemo() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-screen flex items-center justify-center text-center px-4">
        <h1 className="text-4xl font-black text-[#121A50] tracking-tight">
          Scroll down to reveal the Cinematic Footer
        </h1>
      </div>
      <CinematicFooter />
    </div>
  );
}

export default CinematicFooterDemo;
