import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Oswald } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Ayyatech | Enterprise Software Engineering & Digital Transformation",
  description: "Ayyatech empowers global enterprises with cutting-edge software development, cloud infrastructure, AI architecture, and digital consultancy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", jakarta.variable, oswald.variable, "font-sans", "scroll-smooth")}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white text-[#121A50] selection:bg-[#1433D1] selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
