import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/use-motion";

const LINES = ["从安阳湖畔，", "到一日三餐"];
const TOTAL = LINES.join("").length;

const Char = ({ ch, i, progress }: { ch: string; i: number; progress: MotionValue<number> }) => {
  const start = i / TOTAL;
  const opacity = useTransform(progress, [start, start + 1 / TOTAL], [0.18, 1]);
  return <motion.span style={{ opacity }}>{ch}</motion.span>;
};

/** One-screen brand line; characters light up with scroll progress (ScrollReveal-style, opacity only). */
const BrandStatement = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);
  let idx = 0;

  const text = (
    <p aria-label={LINES.join("")} className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-architectural text-foreground text-center leading-[1.3]">
      {LINES.map((line) => (
        <span key={line} aria-hidden className="block">
          {reduced
            ? line
            : Array.from(line).map((ch) => {
                const i = idx++;
                return <Char key={i} ch={ch} i={i} progress={progress} />;
              })}
        </span>
      ))}
    </p>
  );

  if (reduced) {
    return <section className="py-32 bg-background px-6">{text}</section>;
  }
  return (
    <section ref={ref} className="relative h-[200vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">{text}</div>
    </section>
  );
};

export default BrandStatement;
