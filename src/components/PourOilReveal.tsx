import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface PourOilRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

/**
 * 倒油过场：油柱下落 → 油面上涨 → 产品图浮现。
 * 仅在元素首次进入视口时触发一次；prefers-reduced-motion 下直接显示静态图。
 */
const PourOilReveal = ({ src, alt, className, imgClassName }: PourOilRevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [played, setPlayed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setPlayed(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlayed(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn(
          "w-full h-full object-cover transition-opacity duration-700",
          played ? "opacity-100" : "opacity-0",
          reduced ? "" : "[transition-delay:1200ms]",
          imgClassName
        )}
      />
      {!reduced && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-500",
            played ? "opacity-0 [transition-delay:1500ms]" : "opacity-100"
          )}
        >
          {/* 油柱：从顶部中点向下拉伸 */}
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 origin-top w-[6px] rounded-full"
            style={{
              height: "55%",
              background:
                "linear-gradient(to bottom, hsl(45 85% 65% / 0) 0%, hsl(45 80% 60%) 12%, hsl(38 70% 48%) 100%)",
              boxShadow: "0 0 12px hsl(45 80% 55% / 0.5)",
              transform: played ? "scaleY(1)" : "scaleY(0)",
              transition: "transform 600ms cubic-bezier(0.5, 0, 0.2, 1)",
            }}
          />
          {/* 油面上涨 */}
          <div
            className="absolute left-0 right-0 bottom-0 overflow-hidden"
            style={{
              height: played ? "100%" : "0%",
              transition: "height 1000ms cubic-bezier(0.4, 0, 0.2, 1) 500ms",
              background:
                "linear-gradient(to bottom, hsl(45 75% 58% / 0.92) 0%, hsl(38 65% 42% / 0.95) 100%)",
            }}
          >
            {/* 液面顶部高光 */}
            <div
              className="absolute left-0 right-0 top-0 h-[10px]"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(48 90% 75% / 0.7), hsl(45 80% 60% / 0))",
                borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PourOilReveal;
