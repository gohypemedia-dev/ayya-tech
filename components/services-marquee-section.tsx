"use client";

import { PerspectiveMarquee } from "@/components/ui/remocn-perspective-marquee";

const servicesItems = [
  "Website Development",
  "Software Development",
  "Graphic Design",
  "Meta Ads",
  "SEO & Organic Growth",
  "Digital Marketing",
  "Cloud Architecture",
  "Brand Identity",
];

export function ServicesPerspectiveMarquee() {
  return (
    <section className="relative w-full h-[240px] sm:h-[300px] overflow-hidden bg-white border-b border-[#DFE4EA]">
      <PerspectiveMarquee
        items={servicesItems}
        fontSize={68}
        color="#121A50"
        fontWeight={800}
        pixelsPerFrame={2.5}
        rotateY={-24}
        rotateX={8}
        perspective={1200}
        fadeColor="#ffffff"
        background="#ffffff"
        speed={1}
      />
    </section>
  );
}

export default ServicesPerspectiveMarquee;
