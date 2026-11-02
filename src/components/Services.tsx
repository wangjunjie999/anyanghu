import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import SplitText from "@/components/SplitText";
import Reveal from "@/components/Reveal";
import ScrollTitle from "@/components/scroll/ScrollTitle";
import { useMediaQuery, useReducedMotion } from "@/hooks/use-motion";
import waterImg from "@/assets/region-water.jpg";
import climateImg from "@/assets/region-climate.jpg";
import ecologyImg from "@/assets/region-ecology.jpg";
import managementImg from "@/assets/region-management.jpg";

const advantages = [
  {
    number: "01",
    title: "好水源",
    label: "WATER",
    description: "南水北调中线核心水源地，水质清澈，生态环境优越，为油橄榄生长提供天然滋养。",
    image: waterImg,
  },
  {
    number: "02",
    title: "好气候",
    label: "CLIMATE",
    description: "地处北纬32°油橄榄适宜生长带，光照充足，昼夜温差明显，利于油脂与多酚积累。",
    image: climateImg,
  },
  {
    number: "03",
    title: "好生态",
    label: "ECOLOGY",
    description: "山水环绕、林木葱郁，空气清透，远离工业污染，孕育干净纯粹的橄榄果。",
    image: ecologyImg,
  },
  {
    number: "04",
    title: "好管理",
    label: "MANAGEMENT",
    description: "省级林业龙头与国家高新技术企业认证，建立单批次溯源与第三方品控体系，让每一瓶都有据可查。",
    image: managementImg,
  },
];
type Advantage = (typeof advantages)[number];

const TextBlock = ({ s }: { s: Advantage }) => (
  <div className="space-y-6">
    <div className="flex items-baseline gap-4">
      <span className="font-serif text-5xl md:text-6xl font-light text-primary leading-none">{s.number}</span>
      <span className="text-minimal text-muted-foreground">{s.label}</span>
    </div>
    <h4 className="font-serif text-3xl md:text-4xl font-light text-architectural text-foreground">{s.title}</h4>
    <div className="w-12 h-px bg-primary/60" />
    <p className="text-muted-foreground leading-relaxed text-lg">{s.description}</p>
  </div>
);

/* ---------- Desktop: sticky image, text blocks scroll past ---------- */
const DesktopBlock = ({ s, i, onProgress }: { s: Advantage; i: number; onProgress: (i: number, p: MotionValue<number>) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  onProgress(i, scrollYProgress);
  const first = i === 0;
  const last = i === advantages.length - 1;
  const opacity = useTransform(
    scrollYProgress,
    [0.25, 0.4, 0.6, 0.75],
    [first ? 1 : 0.3, 1, 1, last ? 1 : 0.3]
  );
  return (
    <motion.div ref={ref} style={{ opacity }} className="min-h-[80vh] flex items-center">
      <TextBlock s={s} />
    </motion.div>
  );
};

const StickyImage = ({ s, i, progress }: { s: Advantage; i: number; progress?: MotionValue<number> }) => {
  const fallback = useRef(new (class { get() { return 1; } })()).current as unknown as MotionValue<number>;
  const p = progress ?? fallback;
  const opacity = useTransform(p, [0.3, 0.45], [i === 0 ? 1 : 0, 1]);
  const scale = useTransform(p, [0.3, 0.5], [i === 0 ? 1 : 1.05, 1]);
  return (
    <motion.img
      src={s.image}
      alt={s.title}
      loading="lazy"
      width={1280}
      height={896}
      style={{ opacity, scale }}
      className="absolute inset-0 w-full h-full object-cover will-change-transform"
    />
  );
};

const DesktopLayout = () => {
  const progresses = useRef<MotionValue<number>[]>([]);
  const track = (i: number, p: MotionValue<number>) => { progresses.current[i] = p; };
  // Pre-create progresses by rendering blocks first is not possible with hooks order; use per-block refs instead.
  return <DesktopInner track={track} progresses={progresses} />;
};

const DesktopInner = ({
  track,
  progresses,
}: {
  track: (i: number, p: MotionValue<number>) => void;
  progresses: React.MutableRefObject<MotionValue<number>[]>;
}) => {
  const refs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  void track;
  void progresses;
  const scrolls = [
    useScroll({ target: refs[0], offset: ["start end", "end start"] }).scrollYProgress,
    useScroll({ target: refs[1], offset: ["start end", "end start"] }).scrollYProgress,
    useScroll({ target: refs[2], offset: ["start end", "end start"] }).scrollYProgress,
    useScroll({ target: refs[3], offset: ["start end", "end start"] }).scrollYProgress,
  ];
  return (
    <div className="grid grid-cols-12 gap-16">
      <div className="col-span-7">
        <div className="sticky top-0 h-screen flex items-center">
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
            {advantages.map((s, i) => (
              <StickyImage key={s.number} s={s} i={i} progress={scrolls[i]} />
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-5 py-[10vh]">
        {advantages.map((s, i) => (
          <BlockWithRef key={s.number} s={s} i={i} innerRef={refs[i]} progress={scrolls[i]} />
        ))}
      </div>
    </div>
  );
};

const BlockWithRef = ({
  s,
  i,
  innerRef,
  progress,
}: {
  s: Advantage;
  i: number;
  innerRef: React.RefObject<HTMLDivElement>;
  progress: MotionValue<number>;
}) => {
  const first = i === 0;
  const last = i === advantages.length - 1;
  const opacity = useTransform(progress, [0.25, 0.4, 0.6, 0.75], [first ? 1 : 0.3, 1, 1, last ? 1 : 0.3]);
  return (
    <motion.div ref={innerRef} style={{ opacity }} className="min-h-[80vh] flex items-center">
      <TextBlock s={s} />
    </motion.div>
  );
};

/* ---------- Mobile / tablet: stacked, images grow in with scroll ---------- */
const MobileItem = ({ s, reduced }: { s: Advantage; reduced: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  return (
    <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
      <motion.div ref={ref} style={reduced ? undefined : { scale, opacity }} className="md:col-span-7 overflow-hidden bg-muted">
        <img src={s.image} alt={s.title} loading="lazy" width={1280} height={896} className="w-full aspect-[4/3] object-cover" />
      </motion.div>
      <div className="md:col-span-5">
        <TextBlock s={s} />
      </div>
    </div>
  );
};

const Services = () => {
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="services" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollTitle className="mb-20">
            <h2 className="text-minimal text-primary mb-6">PRODUCING REGION</h2>
            <SplitText as="h2" text="产地优势" stagger={60} className="block font-serif text-4xl md:text-6xl font-light text-architectural text-foreground py-2" />
            <Reveal as="p" delay={200} className="mt-8 text-muted-foreground max-w-2xl">
              一瓶好橄榄油，始于一片好土地。安阳湖油橄榄基地坐落于秦巴山脉与汉江交汇处，
              得天独厚的水土与气候，孕育出具有产地特色的中国本土橄榄油。
            </Reveal>
          </ScrollTitle>

          {desktop && !reduced ? (
            <DesktopLayout />
          ) : (
            <div className="space-y-24 md:space-y-32">
              {advantages.map((s) => (
                <MobileItem key={s.number} s={s} reduced={reduced} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
