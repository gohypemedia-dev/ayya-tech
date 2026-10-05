import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
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
      className={cn("h-full", "antialiased", jakarta.variable, "font-sans", "scroll-smooth")}
    >
      <body className="min-h-full flex flex-col bg-white text-[#121A50] selection:bg-[#1433D1] selection:text-white">
        {children}
      </body>
    </html>
  );
}
