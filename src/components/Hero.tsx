import heroImage from "@/assets/hero-architecture.jpg";
import SplitText from "@/components/SplitText";

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[560px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="安阳湖油橄榄基地航拍 — 湖北十堰郧阳"
        fetchPriority="high"
        decoding="async"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover ken-burns will-change-transform"
      />
      <div className="absolute inset-0 hero-overlay" />
      {/* 底部渐变遮罩，柔和过渡到页面背景 */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background/70 pointer-events-none" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 w-full">
        <p
          className="enter-up text-[10px] tracking-[0.18em] sm:text-xs sm:tracking-[0.3em] md:text-sm md:tracking-[0.4em] text-accent mb-6 whitespace-nowrap"
        >
          AN YANG HU · EXTRA VIRGIN OLIVE OIL
        </p>
        <h1 className="font-serif font-light text-[hsl(40_25%_94%)] text-architectural mb-8 leading-[1.15]">
          <SplitText
            trigger="load"
            text="安阳湖橄榄油"
            delay={200}
            stagger={70}
            className="block text-5xl md:text-7xl lg:text-8xl"
          />
          <SplitText
            trigger="load"
            text="湖北十堰 · 特级初榨橄榄油"
            delay={650}
            stagger={35}
            className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl mt-4 text-[hsl(40_25%_94%/0.9)]"
          />
        </h1>
        <p
          className="enter-up text-base md:text-lg text-[hsl(40_25%_94%/0.85)] font-light leading-relaxed max-w-2xl mx-auto text-balance"
          style={{ animationDelay: "1250ms" }}
        >
          源自湖北十堰郧阳安阳湖油橄榄基地，低温物理冷榨，保留橄榄果自然清香与天然营养，为家庭餐桌带来一瓶清爽、健康、有品质感的特级初榨橄榄油。
        </p>

        <div className="enter-up mt-12 flex flex-col sm:flex-row gap-5 justify-center" style={{ animationDelay: "1450ms" }}>
          <a
            href="/work"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest hover:bg-primary/90 transition-colors duration-300"
          >
            了解产品
          </a>
          <a
            href="/about"
            className="inline-flex items-center justify-center px-8 py-3 border border-[hsl(40_25%_94%/0.6)] text-[hsl(40_25%_94%)] text-sm tracking-widest hover:bg-[hsl(40_25%_94%/0.1)] transition-colors duration-300"
          >
            了解品牌
          </a>
        </div>
      </div>

      <div
        className="enter-up absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-[hsl(40_25%_94%/0.7)]"
        style={{ animationDelay: "1800ms" }}
        aria-hidden
      >
        <div className="scroll-line w-px h-14 bg-[hsl(40_25%_94%/0.25)]" />
        <div className="text-minimal mt-4 text-[10px]">SCROLL</div>
      </div>
    </section>
  );
};

export default Hero;
