"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let scrollController: Lenis | null = null;

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (scrollController) {
    scrollController.scrollTo(target, { offset: -112 });
  } else {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 112,
      behavior: reduced ? "instant" : "smooth",
    });
  }
}

export function SmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");

    const configure = () => {
      scrollController?.destroy();
      scrollController = null;
      if (preference.matches) return;

      scrollController = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -112 },
        allowNestedScroll: true,
        autoToggle: true,
        stopInertiaOnNavigate: true,
      });
    };

    configure();
    preference.addEventListener("change", configure);
    return () => {
      preference.removeEventListener("change", configure);
      scrollController?.destroy();
      scrollController = null;
    };
  }, []);

  return null;
}
