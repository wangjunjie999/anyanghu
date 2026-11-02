import { useRef, useState, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { Button } from "@/components/ui/button";
import { prefersReducedMotion, useInViewOnce } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

import craft01 from "@/assets/craft-01.jpg";
import craft02 from "@/assets/craft-02.jpg";
import craft03 from "@/assets/craft-03.jpg";
import craft04 from "@/assets/craft-04.jpg";
import craft05 from "@/assets/craft-05.jpg";
import craft06 from "@/assets/craft-06.jpg";
import craft07 from "@/assets/craft-07.jpg";

const craftSteps = [
  {
    image: craft01,
    link: "",
    title: "油橄榄种植",
    description: "海拔 600m 安阳湖畔，钙质土壤、昼夜温差显著，仿生有机栽培，单株间距 5m 保证通风采光。",
  },
  {
    image: craft02,
    link: "",
    title: "果实成熟",
    description: "10 月转色期日均温差 12℃，多酚与单不饱和脂肪酸同步积累至峰值，孕育油橄榄独特的果香与回甘。",
  },
  {
    image: craft03,
    link: "",
    title: "适时采摘",
    description: "破色率 30–50% 的黄金窗口手工采摘，单日入榨，避免果实在运输与堆放中氧化变质。",
  },
  {
    image: craft04,
    link: "",
    title: "8 小时低温冷榨",
    description: "全程 ≤ 27℃ 物理冷榨，从枝头到油罐 < 8 小时，最大程度锁住鲜果香气与营养活性。",
  },
  {
    image: craft05,
    link: "",
    title: "品质检测",
    description: "酸价、过氧化值、多酚含量逐批送检，特级初榨标准 100% 通过，每瓶可溯源至单一产地与批次。",
  },
  {
    image: craft06,
    link: "",
    title: "灌装储存",
    description: "深色玻璃瓶氮气保护避光灌装，恒温 18℃ 暗仓陈化，风味与营养稳定保持 24 个月。",
  },
  {
    image: craft07,
    link: "",
    title: "进入家庭餐桌",
    description: "从安阳湖畔到您的一日三餐，每一滴都承载产地、工艺与匠心，伴中国家庭健康日常。",
  },
];

const About = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [inViewRef, tracksShown] = useInViewOnce<HTMLDivElement>(0.1);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const cardsOf = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  const scrollToStep = (i: number) => {
    const track = trackRef.current;
    const card = cardsOf()[i];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - 24, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  const onTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) {
      setActiveStep(craftSteps.length - 1);
      return;
    }
    const cards = cardsOf();
    let best = 0;
    let dist = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - 24 - track.scrollLeft);
      if (d < dist) { dist = d; best = i; }
    });
    setActiveStep(best);
  };

  // 鼠标拖动（触摸使用原生滑动）
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !trackRef.current) return;
    drag.current = { x: e.clientX, left: trackRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d || !track) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      setDragging(true);
      track.setPointerCapture(e.pointerId);
    }
    if (d.moved) track.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    if (!drag.current) return;
    const moved = drag.current.moved;
    drag.current = null;
    setDragging(false);
    if (moved) requestAnimationFrame(() => scrollToStep(activeStepRef.current));
  };
  const activeStepRef = useRef(0);
  activeStepRef.current = activeStep;

  return (

    <section id="about" className="py-32 bg-muted/40">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* 上半部分：品牌叙事 */}
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-minimal text-primary mb-4">BRAND STORY</h2>
              <h3 className="font-serif text-4xl md:text-6xl font-light text-architectural text-foreground mb-12">
                从安阳湖畔，
                <br />
                到一日三餐
              </h3>

              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  十堰泽盟农业开发有限公司成立于 2017 年，是湖北省林业产业化省级重点龙头企业、国家高新技术企业。
                </p>
                <p>
                  公司依托湖北十堰郧阳安阳湖油橄榄基地，围绕油橄榄种植、鲜果采收、低温冷榨、品质检测和产品销售，
                  打造具有产地特色和品质溯源价值的中国本土橄榄油品牌。
                </p>
              </div>
            </div>

            <div className="md:pt-24">
              <div className="grid grid-cols-2 gap-8 pb-8 border-b border-border">
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">成立时间</h4>
                  <p className="font-serif text-3xl text-foreground font-light"><CountUp from={2000} to={2017} /></p>
                </div>
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">荣誉资质</h4>
                  <p className="text-foreground leading-relaxed">省级龙头企业 · 国家高新企业</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">核心基地</h4>
                  <p className="text-foreground leading-relaxed">湖北十堰郧阳安阳湖</p>
                </div>
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">核心产品</h4>
                  <p className="text-foreground leading-relaxed">特级初榨橄榄油</p>
                </div>
              </div>
            </div>
          </div>

          {/* 下半部分：品质工艺横向时间线 */}
          <div className="mt-32 md:mt-40">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <Reveal>
                <h2 className="text-minimal text-primary mb-4">CRAFTSMANSHIP</h2>
                <h3 className="font-serif text-3xl md:text-5xl font-light text-architectural text-foreground">
                  品质工艺 · 七步溯源
                </h3>
              </Reveal>
              <Reveal delay={100} className="flex flex-col md:items-end gap-5">
                <p className="text-muted-foreground text-sm md:text-base max-w-md md:text-right">
                  左右滑动或点击箭头，探索每一道工序，每一颗油橄榄从安阳湖畔到家庭餐桌的完整旅程。
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="rounded-full" aria-label="上一步" disabled={activeStep === 0} onClick={() => scrollToStep(activeStep - 1)}>
                    <ChevronLeft aria-hidden />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full" aria-label="下一步" disabled={activeStep === craftSteps.length - 1} onClick={() => scrollToStep(activeStep + 1)}>
                    <ChevronRight aria-hidden />
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* 步骤进度条 */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-minimal text-primary tabular-nums">{String(activeStep + 1).padStart(2, "0")}</span>
              <div className="relative flex-1 h-px bg-border overflow-hidden">
                <div
                  className="absolute inset-0 bg-primary origin-left transition-transform duration-500 ease-out motion-reduce:transition-none"
                  style={{ transform: `scaleX(${(activeStep + 1) / craftSteps.length})` }}
                />
              </div>
              <span className="text-minimal text-muted-foreground tabular-nums">{String(craftSteps.length).padStart(2, "0")}</span>
            </div>

            <div ref={inViewRef}>
            <div
              ref={trackRef}
              onScroll={onTrackScroll}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className={cn(
                "relative -mx-6 px-6 scroll-px-6 flex gap-5 md:gap-6 overflow-x-auto pb-4 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overscroll-x-contain",
                dragging ? "cursor-grabbing select-none snap-none" : "cursor-grab snap-x snap-mandatory"
              )}
              aria-label="品质工艺七个步骤"
            >
              {craftSteps.map((step, i) => (
                <div
                  key={step.title}
                  style={{ transitionDelay: tracksShown ? `${Math.min(i, 4) * 80}ms` : undefined }}
                  className={cn(
                    "snap-start shrink-0 w-[80%] sm:w-[46%] lg:w-[31%] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    tracksShown ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
                  )}
                >
                  <article aria-current={activeStep === i ? "step" : undefined}>
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img src={step.image} alt={step.title} loading="lazy" draggable={false} className="w-full h-full object-cover" />
                    </div>
                    <div className="pt-6 pr-2">
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="font-serif text-3xl font-light text-primary leading-none tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-serif text-xl md:text-2xl font-light text-foreground">{step.title}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{step.description}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            </div>

            {/* SEO / 无障碍兜底列表 */}
            <ol className="sr-only">
              {craftSteps.map((step, i) => (
                <li key={step.title}>
                  第 {i + 1} 步 — {step.title}：{step.description}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
