import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#121A50] px-4 text-center">
      <h1 className="text-8xl font-black text-[#EE461F] tracking-tight">404</h1>
      <h2 className="mt-4 text-2xl font-bold sm:text-3xl text-[#121A50]">
        Page Not Found
      </h2>
      <p className="mt-2 text-base text-[#4B5565] max-w-md">
        The page you are looking for does not exist or has been moved to another URL.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#121A50] text-white rounded-xl font-semibold hover:bg-[#182368] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
