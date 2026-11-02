import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/use-motion";

/** Industrial-park scene: a rounded centered "window" that expands to full bleed as you scroll in. */
const ParkWindow = ({ src }: { src: string }) => {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const scale = useTransform(p, [0, 0.85], [0.8, 1]);
  const radius = useTransform(p, [0, 0.85], [24, 0]);
  const t1 = useTransform(p, [0.55, 0.85], [0, 1]);
  const y1 = useTransform(p, [0.55, 0.85], [32, 0]);
  const t2 = useTransform(p, [0.62, 0.92], [0, 1]);
  const y2 = useTransform(p, [0.62, 0.92], [32, 0]);
  const t3 = useTransform(p, [0.7, 1], [0, 1]);
  const y3 = useTransform(p, [0.7, 1], [32, 0]);
  const s = (o: typeof t1, y: typeof y1) => (reduced ? undefined : { opacity: o, y });

  return (
    <section ref={ref} className="relative py-40 overflow-hidden bg-background">
      <motion.div
        aria-hidden
        className="absolute inset-0 overflow-hidden will-change-transform"
        style={reduced ? undefined : { scale, borderRadius: radius }}
      >
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
        <div className="absolute inset-0 hero-overlay" />
      </motion.div>
      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl text-[hsl(40_25%_94%)]">
          <motion.p style={s(t1, y1)} className="text-minimal text-accent mb-6">INDUSTRY · TOURISM · WELLNESS</motion.p>
          <motion.h3 style={s(t2, y2)} className="font-serif text-4xl md:text-5xl font-light text-architectural mb-8">
            油橄榄大健康产业园
          </motion.h3>
          <motion.p style={s(t3, y3)} className="text-[hsl(40_25%_94%/0.85)] leading-relaxed text-lg">
            现代化榨油体验车间、科研与研学馆、展示展销馆、农旅融合空间，
            未来打造集种植、加工、文旅、康养于一体的产业融合示范园，
            让一颗橄榄果的旅程被看见、被体验。
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ParkWindow;
