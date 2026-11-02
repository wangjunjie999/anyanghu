import { ElementType, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useInViewOnce } from "@/hooks/use-motion";

interface SplitTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Delay before the first character, ms */
  delay?: number;
  /** Delay between characters, ms */
  stagger?: number;
  /** "load" plays on mount, "view" plays once when scrolled into view */
  trigger?: "load" | "view";
}

/**
 * React Bits SplitText-style: characters rise and fade in once, then stay still.
 * Uses only opacity + transform. Screen readers get the plain text via aria-label.
 */
const SplitText = ({ text, as: Tag = "span", className, delay = 0, stagger = 45, trigger = "view" }: SplitTextProps) => {
  const [ref, inView] = useInViewOnce<HTMLElement>(0.2);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const shown = trigger === "load" ? mounted : inView;
  const words = text.split(/(\s+)/);
  let idx = 0;

  return (
    <Tag ref={ref} aria-label={text} className={className}>
      {words.map((word, wi) =>
        /^\s+$/.test(word) ? (
          <span key={wi} aria-hidden="true"> </span>
        ) : (
          <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch) => {
              const i = idx++;
              return (
                <span
                  key={i}
                  className={cn(
                    "inline-block transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[0.4em]"
                  )}
                  style={{ transitionDelay: shown ? `${delay + i * stagger}ms` : undefined }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        )
      )}
    </Tag>
  );
};

export default SplitText;
