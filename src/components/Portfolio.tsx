import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { homepageShowcases } from "@/data/products";
import Reveal from "@/components/Reveal";
import GradualBlur from "@/components/GradualBlur";
import CircularGallery from "@/components/CircularGallery";
import ScrollFloat from "@/components/ScrollFloat";
import { useTheme } from "@/components/ThemeProvider";

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
  const galleryTextColor = typeof document === "undefined" ? "" : getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim();
  return (
    <section id="work" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-minimal text-primary mb-6">PRODUCTS</h2>
            <ScrollFloat
              containerClassName="my-0 py-4 md:py-6"
              textClassName="font-serif text-4xl md:text-6xl font-light text-architectural text-foreground"
              stagger={0.05}
              animationDuration={1.2}
              scrollStart="top bottom-=5%"
              scrollEnd="bottom center+=10%"
            >
              产品中心
            </ScrollFloat>
            <p className="mt-10 md:mt-12 text-muted-foreground max-w-2xl">
              从节日礼赠到日常餐桌，安阳湖为不同的生活场景提供合适的橄榄油选择。
            </p>
          </div>

          {/* 弧形产品轮播 */}
          <div className="relative h-[380px] md:h-[560px] mb-24 -mx-6 md:-mx-12">
            <CircularGallery
              items={homepageShowcases.map((p) => ({ image: p.image, text: p.name }))}
              bend={3}
              textColor={`hsl(${galleryTextColor})`}
              borderRadius={0.05}
              scrollEase={0.04}
              font="400 22px 'Noto Serif SC', serif"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
            {homepageShowcases.map((p, i) => (
              <Reveal key={i} variant="fade-scale" delay={(i % 2) * 120} className="group">
                <div className="relative overflow-hidden bg-product-photo">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-[55vh] object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <GradualBlur position="bottom" height="3rem" strength={1} divCount={2} curve="bezier" zIndex={2} />
                </div>

                <div className="mt-8 space-y-4">
                  <p className="text-minimal text-primary">{p.english}</p>
                  <h4 className="font-serif text-2xl md:text-3xl font-light text-architectural text-foreground">
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
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
