import heroImage from "@/assets/hero-architecture.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <p className="text-xs md:text-sm tracking-[0.4em] text-accent mb-6 reveal">
          AN YANG HU · EXTRA VIRGIN OLIVE OIL
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-background text-architectural mb-8 reveal">
          安阳湖橄榄油
        </h1>
        <p className="text-base md:text-lg text-background/85 font-light leading-relaxed max-w-2xl mx-auto reveal-delayed">
          源自湖北十堰郧阳安阳湖油橄榄基地，低温物理冷榨，
          保留橄榄果自然清香与天然营养，
          为家庭餐桌带来一瓶清爽、健康、有品质感的特级初榨橄榄油。
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center reveal-delayed">
          <a
            href="/work"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest hover:bg-primary/90 transition-colors duration-300"
          >
            了解产品
          </a>
          <a
            href="#gift"
            className="inline-flex items-center justify-center px-8 py-3 border border-background/60 text-background text-sm tracking-widest hover:bg-background/10 transition-colors duration-300"
          >
            查看礼盒
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 reveal-delayed">
        <div className="w-px h-16 bg-background/40 mx-auto" />
        <div className="text-minimal text-background/60 mt-4">SCROLL</div>
      </div>
    </section>
  );
};

export default Hero;
