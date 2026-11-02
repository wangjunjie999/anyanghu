import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/use-motion";

/** Section heading tied to scroll progress: opacity 0→1, y 40→0, reverses on scroll up. */
const ScrollTitle = ({ children, className }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.6"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  return (
    <motion.div ref={ref} className={className} style={reduced ? undefined : { opacity, y }}>
      {children}
    </motion.div>
  );
};

export default ScrollTitle;
