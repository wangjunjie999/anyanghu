import { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";
import { useInViewOnce } from "@/hooks/use-motion";

type Variant = "fade-up" | "fade-scale" | "fade";

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  as?: ElementType;
  className?: string;
  threshold?: number;
}

const initialClass: Record<Variant, string> = {
  "fade-up": "opacity-0 translate-y-5",
  "fade-scale": "opacity-0 translate-y-3 scale-[0.98]",
  fade: "opacity-0",
};

/** Plays once when entering the viewport (AnimatedContent / FadeContent style). */
const Reveal = ({ children, variant = "fade-up", delay = 0, as: Tag = "div", className, threshold = 0.15 }: RevealProps) => {
  const [ref, shown] = useInViewOnce<HTMLElement>(threshold);
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : undefined }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        shown ? "opacity-100 translate-y-0 scale-100" : initialClass[variant],
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
