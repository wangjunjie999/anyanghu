import { useEffect, useState } from "react";
import { prefersReducedMotion, useInViewOnce } from "@/hooks/use-motion";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
}

/** React Bits CountUp-style: counts once when in view; reduced motion shows the final value. */
const CountUp = ({ to, from = 0, duration = 1600, className }: CountUpProps) => {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>(0.4);
  const [value, setValue] = useState(() => (prefersReducedMotion() ? to : from));

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className={className} aria-label={String(to)}>
      <span aria-hidden="true" className="tabular-nums">{value}</span>
    </span>
  );
};

export default CountUp;
