"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// Shadcn UI Carousel Imports
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

// --- Carousel Context ---
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselApi = ReturnType<typeof useEmblaCarousel>[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};
type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

// --- Main Carousel Component ---
const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

// --- Carousel Content ---
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4 md:-ml-6" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

// --- Carousel Item ---
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4 md:pl-6" : "pt-4",
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

// --- Carousel Controls ---
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-11 w-11 rounded-full cursor-pointer z-30",
        "right-4 sm:right-8 top-1/2 -translate-y-1/2",
        className,
      )}
      onClick={scrollNext}
      disabled={!canScrollNext}
      {...props}
    >
      <ArrowRight className="h-5 w-5" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

const CarouselPrev = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-11 w-11 rounded-full cursor-pointer z-30",
        "left-4 sm:left-8 top-1/2 -translate-y-1/2",
        className,
      )}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      {...props}
    >
      <ArrowLeft className="h-5 w-5" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrev.displayName = "CarouselPrev";

// --- Service Interface ---
export interface Service {
  number: string;
  title: string;
  description: string;
  icon?: any;
  gradient: string;
  image?: string;
  category?: string;
  highlights?: string[];
}

const renderServiceIcon = (Icon: any) => {
  if (!Icon) return null;
  if (React.isValidElement(Icon)) return Icon;
  const Component = Icon;
  return <Component className="h-5 w-5 text-[#EE461F]" />;
};

// Apple TV+ Style Hero Banner Slide Component
const ServiceBannerCard = ({ service }: { service: Service; index: number }) => {
  const IconComp = service.icon;

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[480px] rounded-lg overflow-hidden border border-white/15 shadow-2xl group bg-[#090D28]">
      {/* Background Image */}
      {service.image && (
        <img
          src={service.image}
          alt={service.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80';
          }}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      )}

      {/* Cinematic Gradient Overlays (Apple TV+ Banner Aesthetic) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080D2B] via-[#080D2B]/75 to-transparent md:bg-gradient-to-r md:from-[#080D2B] md:via-[#080D2B]/85 md:to-transparent md:w-[68%]" />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

      {/* Banner Foreground Content */}
      <div className="relative z-10 w-full h-full p-6 sm:p-10 md:p-12 flex flex-col justify-end md:justify-center items-start max-w-2xl text-left">
        {/* Service Icon Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-[#121A50] font-bold text-xs sm:text-sm shadow-xl mb-4 border border-white/40">
          {IconComp && (
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              {renderServiceIcon(IconComp)}
            </div>
          )}
          <span>{service.title}</span>
        </div>

        {/* Title & Description */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3 drop-shadow-md">
          {service.title}
        </h3>

        <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-6 max-w-xl line-clamp-3 drop-shadow-sm">
          {service.description}
        </p>

        {/* Highlights Tags */}
        {service.highlights && service.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/15 w-full">
            {service.highlights.map((h, hIdx) => (
              <span
                key={hIdx}
                className="text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs"
              >
                ✓ {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main Exportable Carousel
export const ServiceCarousel = ({ services }: { services: Service[] }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const autoplay = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <div className="w-full max-w-[1540px] mx-auto px-2 sm:px-4">
      <Carousel
        ref={ref}
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[autoplay.current]}
        className="relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem
                key={index}
                className="basis-[88%] sm:basis-[85%] md:basis-[82%] lg:basis-[80%]"
              >
                <div className="py-2">
                  <ServiceBannerCard service={service} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </motion.div>

        {/* Prev / Next Banner Navigation Buttons */}
        <CarouselPrev className="bg-white/20 hover:bg-[#EE461F] text-white backdrop-blur-md border border-white/30 shadow-2xl" />
        <CarouselNext className="bg-white/20 hover:bg-[#EE461F] text-white backdrop-blur-md border border-white/30 shadow-2xl" />
      </Carousel>
    </div>
  );
};

export default ServiceCarousel;
