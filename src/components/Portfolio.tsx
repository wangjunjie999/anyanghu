import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { homepageShowcases } from "@/data/products";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import TiltCard from "@/components/TiltCard";
import ScrollTitle from "@/components/scroll/ScrollTitle";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useMediaQuery, useReducedMotion } from "@/hooks/use-motion";

const PARALLAX = [60, 20, 80, 40];

/** Staggered parallax: each card drifts up at its own speed; image settles 1.08 → 1. */
const ParallaxCard = ({ i, children, image }: { i: number; children: (img: React.ReactNode) => React.ReactNode; image: { src: string; alt: string } }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const amp = PARALLAX[i % PARALLAX.length] * (desktop ? 1 : 0.5);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amp, -amp]);
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(enter, [0, 1], [1.08, 1]);
  const img = (
    <motion.div className="w-full h-full will-change-transform" style={reduced ? undefined : { scale }}>
      <img src={image.src} alt={image.alt} loading="lazy" className="w-full h-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
    </motion.div>
  );
  return (
    <motion.div ref={ref} style={reduced ? undefined : { y }}>
      {children(img)}
    </motion.div>
  );
};

const Portfolio = () => {
  return (
    <section id="work" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollTitle className="mb-16 md:mb-20">
            <h2 className="text-minimal text-primary mb-6">PRODUCTS</h2>
            <SplitText
              as="h2"
              text="产品中心"
              stagger={60}
              className="block font-serif text-4xl md:text-6xl font-light text-architectural text-foreground py-2"
            />
            <Reveal as="p" delay={200} className="mt-8 text-muted-foreground max-w-2xl">
              从节日礼赠到日常餐桌，安阳湖为不同的生活场景提供合适的橄榄油选择。
            </Reveal>
          </ScrollTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
            {homepageShowcases.map((p, i) => (
              <Reveal key={p.series} variant="fade-up" delay={i * 80} className="min-w-0">
                <ParallaxCard i={i} image={{ src: p.image, alt: p.name }}>{(img) => (
                <TiltCard>
                  <div className="relative aspect-[4/5] overflow-hidden bg-product-photo">
                    {img}
                  </div>

                  <div className="mt-6 space-y-3">
                    <p className="text-minimal text-primary">{p.english}</p>
                    <h4 className="font-serif text-xl md:text-2xl font-light text-architectural text-foreground">
                      {p.name}
                    </h4>
                    <ul className="text-muted-foreground space-y-1 text-sm leading-relaxed">
                      {[`规格：${p.spec}`, ...p.params].map((s) => (
                        <li key={s}>· {s}</li>
                      ))}
                    </ul>
                    <Button asChild variant="link" className="px-0 rounded-none">
                      <Link to={`/work?series=${p.series}`} aria-label={`查看产品：${p.name}`}>查看产品 <ArrowRight aria-hidden="true" /></Link>
                    </Button>
                  </div>
                </TiltCard>
                )}</ParallaxCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
