import { useEffect, useRef, useState, ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";

type Variant = "fade-up" | "fade-rotate" | "fade-scale";

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  as?: ElementType;
  className?: string;
  threshold?: number;
}

const initialClass: Record<Variant, string> = {
  "fade-up": "opacity-0 translate-y-8",
  "fade-rotate": "opacity-0 -rotate-3 translate-y-4",
  "fade-scale": "opacity-0 scale-[0.96]",
};

const Reveal = ({
  children,
  variant = "fade-up",
  delay = 0,
  as: Tag = "div",
  className,
  threshold = 0.15,
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref as any}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        shown ? "opacity-100 translate-y-0 translate-x-0 rotate-0 scale-100" : initialClass[variant],
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
