import { useEffect, useState } from "react";
import gift1 from "@/assets/project-1.jpg";
import olives from "@/assets/project-2.jpg";
import workshop from "@/assets/project-3.jpg";
import Reveal from "@/components/Reveal";
import GradualBlur from "@/components/GradualBlur";
import CircularGallery from "@/components/CircularGallery";
import { useTheme } from "@/components/ThemeProvider";

const products = [
  {
    image: gift1,
    title: "科拉蒂高端礼盒系列",
    series: "PREMIUM GIFT BOX",
    specs: ["规格：500ml × 2 / 1L × 2", "酸度：≤ 0.5%", "橄榄多酚：368.67 mg/kg", "品种：科拉蒂单品种橄榄果"],
  },
  {
    image: olives,
    title: "经典款礼盒系列",
    series: "CLASSIC GIFT BOX",
    specs: ["规格：500ml × 2 / 1L × 2", "酸度：≤ 0.5%", "品种：奇迹、皮瓜尔、皮削利、阿尔波萨纳混合"],
  },
  {
    image: workshop,
    title: "科拉蒂单品种橄榄油",
    series: "SINGLE VARIETAL",
    specs: ["科拉蒂单品种橄榄果冷榨", "保留高多酚天然营养", "适合凉拌、蘸面包、淋汤"],
  },
  {
    image: gift1,
    title: "特级初榨橄榄油瓶装系列",
    series: "EVERYDAY EVOO",
    specs: ["家庭日常用油", "低温物理冷榨", "自然清香 · 健康轻爽"],
  },
];

const Portfolio = () => {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", update);
    return () => { obs.disconnect(); mq.removeEventListener("change", update); };
  }, [theme]);
  const galleryTextColor = isDark ? "hsl(40 30% 95%)" : "hsl(38 25% 22%)";
  return (
    <section id="work" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-minimal text-primary mb-4">PRODUCTS</h2>
            <h3 className="font-serif text-4xl md:text-6xl font-light text-architectural text-foreground">
              产品中心
            </h3>
            <p className="mt-6 text-muted-foreground max-w-2xl">
              从节日礼赠到日常餐桌，安阳湖为不同的生活场景提供合适的橄榄油选择。
            </p>
          </div>

          {/* 弧形产品轮播 */}
          <div className="relative h-[380px] md:h-[560px] mb-24 -mx-6 md:-mx-12">
            <CircularGallery
              items={products.map((p) => ({ image: p.image, text: p.title }))}
              bend={3}
              textColor={galleryTextColor}
              borderRadius={0.05}
              scrollEase={0.04}
              font="500 22px 'Noto Serif SC', serif"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
            {products.map((p, i) => (
              <Reveal key={i} variant="fade-scale" delay={(i % 2) * 120} className="group">
                <div className="relative overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-[55vh] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <GradualBlur position="bottom" height="3rem" strength={1.2} divCount={4} curve="bezier" zIndex={2} />
                </div>

                <div className="mt-8 space-y-4">
                  <p className="text-minimal text-primary">{p.series}</p>
                  <h4 className="font-serif text-2xl md:text-3xl font-light text-architectural text-foreground">
                    {p.title}
                  </h4>
                  <ul className="text-muted-foreground space-y-1 text-sm leading-relaxed">
                    {p.specs.map((s) => (
                      <li key={s}>· {s}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
