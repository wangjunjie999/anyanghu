import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import CircularGallery from "@/components/CircularGallery";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { products, productSeries, parseProductSeries } from "@/data/products";

const Work = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSeries = parseProductSeries(searchParams.get("series"));
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
  const visibleSeries = productSeries.filter((series) => activeSeries === "all" || series.id === activeSeries);
  const selectSeries = (series: string) => {
    const next = new URLSearchParams(searchParams);
    if (series === "all") next.delete("series");
    else next.set("series", series);
    setSearchParams(next, { preventScrollReset: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="产品中心 · 安阳湖特级初榨橄榄油与精品礼盒"
        description="安阳湖12款真实产品：科拉蒂单品种高多酚系列、经典款系列与礼盒系列，涵盖125ml、500ml玻璃瓶，500ml、1000ml马口铁及500ml×2、1L×2礼盒。酸度 ≤ 0.5%，科拉蒂橄榄多酚368.67 mg/kg。" path="/work" />
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <h1 className="font-serif text-5xl md:text-7xl font-light text-architectural text-foreground mb-8">产品中心</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">从节日礼赠到日常餐桌，安阳湖为不同的生活场景提供合适的橄榄油选择。</p>
        </div>
      </section>
      <section className="pb-12">
        <div className="relative h-[380px] md:h-[600px] w-full">
          <CircularGallery items={products.map((p) => ({ image: p.image, text: p.shortName }))}
            bend={3} textColor={`hsl(${galleryTextColor})`} borderRadius={0.05} scrollEase={0.04} font="500 22px 'Noto Serif SC', serif" />
        </div>
      </section>
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-wrap gap-x-6 gap-y-3 md:gap-x-8" aria-label="产品系列">
            {[{ id: "all", label: "全部" }, ...productSeries].map((series) => (
              <Button key={series.id} variant="link" aria-pressed={activeSeries === series.id}
                onClick={() => selectSeries(series.id)}
                className={`relative rounded-none px-0 no-underline hover:no-underline ${activeSeries === series.id ? "text-primary border-b border-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {series.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
      <div className="container mx-auto px-6 max-w-7xl pb-32 space-y-24">
        {visibleSeries.map((series) => (
          <section key={series.id} aria-labelledby={`series-${series.id}`}>
            <div className="mb-10">
              <h2 id={`series-${series.id}`} className="font-serif text-2xl md:text-3xl font-light text-foreground mb-4">{series.name}</h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">{series.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.filter((p) => p.series === series.id).map((p) => (
                <article key={p.id} className="group min-w-0" data-product-id={p.id}>
                  <div className="aspect-[3/4] overflow-hidden bg-product-photo mb-6">
                    <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-contain p-3 transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="text-xs text-primary mb-3">{series.name}</p>
                  <h3 className="font-serif text-base font-medium leading-relaxed min-h-[5.25rem] break-words mb-4">{p.name}</h3>
                  <p className="text-sm text-foreground border-t border-border pt-4 mb-3">规格：{p.spec} · {p.pack}</p>
                  <ul className="text-sm text-muted-foreground leading-relaxed space-y-1 mb-4">{p.params.map((param) => <li key={param}>{param}</li>)}</ul>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <section className="py-32 bg-muted/40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-architectural text-foreground mb-8">
              想要团购或定制礼盒？
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              告诉我们使用场景与数量，我们会为您匹配合适的产品方案
            </p>
            <Button asChild className="rounded-none"><Link
              to="/contact"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest hover:bg-primary/90 transition-colors duration-300"
            >
              联系我们
            </Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Work;
