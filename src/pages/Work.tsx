import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import CircularGallery from "@/components/CircularGallery";
import { useTheme } from "@/components/ThemeProvider";
import gift from "@/assets/project-1.jpg";
import olives from "@/assets/project-2.jpg";
import workshop from "@/assets/project-3.jpg";

const Work = () => {
  const [activeCategory, setActiveCategory] = useState("全部");
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
  const products = [
    {
      image: gift,
      title: "科拉蒂高端礼盒",
      location: "PREMIUM GIFT BOX",
      category: "礼盒",
      description: "科拉蒂单品种高多酚特级初榨橄榄油礼盒，适合高端送礼与商务礼赠。",
      area: "500ml×2 / 1L×2",
      year: "酸度 ≤ 0.5%",
    },
    {
      image: gift,
      title: "经典款礼盒",
      location: "CLASSIC GIFT BOX",
      category: "礼盒",
      description: "奇迹、皮瓜尔、皮削利、阿尔波萨纳等品种混合，风味均衡。",
      area: "500ml×2 / 1L×2",
      year: "酸度 ≤ 0.5%",
    },
    {
      image: olives,
      title: "科拉蒂单品种橄榄油",
      location: "SINGLE VARIETAL",
      category: "单品种",
      description: "科拉蒂单品种橄榄果冷榨，保留高多酚天然营养。",
      area: "500ml",
      year: "多酚 368.67 mg/kg",
    },
    {
      image: workshop,
      title: "特级初榨橄榄油瓶装",
      location: "EVERYDAY EVOO",
      category: "日常",
      description: "家庭日常用油，低温物理冷榨，自然清香轻爽。",
      area: "500ml / 1L",
      year: "酸度 ≤ 0.5%",
    },
    {
      image: gift,
      title: "企业定制礼盒",
      location: "CORPORATE CUSTOM",
      category: "礼盒",
      description: "支持包装、Logo 与配比定制，适合节日团购与员工福利。",
      area: "按需定制",
      year: "—",
    },
    {
      image: olives,
      title: "节日限定礼盒",
      location: "SEASONAL EDITION",
      category: "礼盒",
      description: "中秋、春节限定包装，承载产地心意。",
      area: "500ml×2",
      year: "限量",
    },
  ];

  const categories = ["全部", "礼盒", "单品种", "日常"];
  const filtered = activeCategory === "全部" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="产品中心 · 安阳湖特级初榨橄榄油与精品礼盒"
        description="科拉蒂高端礼盒、经典款礼盒、单品种橄榄油及日常瓶装系列 — 安阳湖低温物理冷榨，酸度 ≤ 0.5%，多酚高达 368.67 mg/kg。"
        path="/work"
      />
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto mb-12">
            <h1 className="font-serif text-5xl md:text-7xl font-light text-architectural text-foreground mb-8">
              产品中心
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              从节日礼赠到日常餐桌，安阳湖为不同的生活场景提供合适的橄榄油选择。
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="relative h-[380px] md:h-[600px] w-full">
          <CircularGallery
            items={products.map((p) => ({ image: p.image, text: p.title }))}
            bend={3}
            textColor="hsl(38 25% 22%)"
            borderRadius={0.05}
            scrollEase={0.04}
            font="500 22px 'Noto Serif SC', serif"
          />
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-8 justify-center md:justify-start">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`text-sm tracking-wide transition-colors duration-300 relative group ${
                    activeCategory === c ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-px bg-primary transition-transform duration-300 origin-left ${
                      activeCategory === c ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
              {filtered.map((p, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative overflow-hidden mb-8 bg-muted">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-[55vh] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-2">
                      <span className="text-xs tracking-wider text-primary">{p.category}</span>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <h2 className="font-serif text-2xl lg:text-3xl font-light text-architectural text-foreground mb-2">
                        {p.title}
                      </h2>
                      <p className="text-minimal text-muted-foreground">{p.location}</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{p.description}</p>
                    <div className="flex gap-8 pt-4 border-t border-border">
                      <div>
                        <p className="text-minimal text-muted-foreground mb-1">规格</p>
                        <p className="text-foreground">{p.area}</p>
                      </div>
                      <div>
                        <p className="text-minimal text-muted-foreground mb-1">参数</p>
                        <p className="text-foreground">{p.year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-muted/40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-architectural text-foreground mb-8">
              想要团购或定制礼盒？
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              告诉我们使用场景与数量，我们会为您匹配合适的产品方案
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest hover:bg-primary/90 transition-colors duration-300"
            >
              联系我们
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
