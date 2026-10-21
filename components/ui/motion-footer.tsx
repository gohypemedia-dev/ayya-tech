"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";

interface CinematicFooterProps {
  onQuoteClick?: () => void;
  showProjectCta?: boolean;
}

export function CinematicFooter({ onQuoteClick, showProjectCta = true }: CinematicFooterProps) {
  const actionClass = "inline-flex items-center justify-center gap-3 rounded-lg bg-[#EC4621] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0E33CB]";

  return (
    <footer className="border-t border-[#EDF0F3] bg-white text-[#121D50] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#1F45E4] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[#1F45E4]">
      <div className="w-full px-5 sm:px-8 lg:px-12">
        {showProjectCta && <div className="flex flex-col gap-6 border-b border-[#EDF0F3] py-9 sm:flex-row sm:items-center sm:justify-between sm:py-12">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Have a project in mind?</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed">Let&apos;s talk about what you want to build.</p>
          </div>
          {onQuoteClick ? (
            <button type="button" onClick={onQuoteClick} className={`${actionClass} w-fit cursor-pointer`}>Discuss your project <ArrowUpRight size={17} aria-hidden="true" /></button>
          ) : (
            <Link href="/contact" className={`${actionClass} w-fit`}>Discuss your project <ArrowUpRight size={17} aria-hidden="true" /></Link>
          )}
        </div>}
        <div className="flex flex-col gap-7 py-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" aria-label="Ayyatech home" className="w-fit"><Image src="/images/ayya-logo.png" alt="Ayyatech" width={140} height={54} className="h-auto w-[140px]" /></Link>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link href="/services" className="hover:text-[#0E33CB]">Services</Link>
            <Link href="/case-studies" className="hover:text-[#0E33CB]">Case studies</Link>
            <Link href="/contact" className="hover:text-[#0E33CB]">Contact</Link>
          </nav>
          <a href="mailto:contact@ayyatech.com" className="w-fit text-sm hover:text-[#0E33CB]">contact@ayyatech.com</a>
        </div>
        <div className="flex items-center justify-between gap-5 border-t border-[#EDF0F3] py-5">
          <p className="text-xs leading-relaxed">&copy; {new Date().getFullYear()} Ayyatech. All rights reserved.</p>
          <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })} className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#EDF0F3] transition-colors hover:bg-[#EDF0F3]"><ArrowUp size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </footer>
  );
}

export default CinematicFooter;
