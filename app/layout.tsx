import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Oswald } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Ayyatech | Enterprise Software Engineering & Digital Transformation",
  description: "Ayyatech empowers global enterprises with cutting-edge software development, cloud infrastructure, AI architecture, and digital consultancy.",
  icons: {
    icon: "/images/ayya-logo.png",
  },
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
      className={cn("h-full", "antialiased", jakarta.variable, oswald.variable, "font-sans")}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white text-[#121D50] selection:bg-[#0E33CB] selection:text-white"
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
