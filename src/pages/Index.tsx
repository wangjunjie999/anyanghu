import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import ParkWindow from "@/components/scroll/ParkWindow";
import BrandStatement from "@/components/scroll/BrandStatement";
import ScrollTitle from "@/components/scroll/ScrollTitle";
import parkAsset from "@/assets/base/base-industrial-park.jpg.asset.json";
const heroImage = parkAsset.url;
import giftAsset from "@/assets/products/gift-coratina-500mlx2.jpg.asset.json";
const giftImage = giftAsset.url;

const Index = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "十堰泽盟农业开发有限公司",
      alternateName: "安阳湖橄榄油",
      url: "https://anyanghu.lovable.app",
      telephone: "+86-19971666999",
      address: {
        "@type": "PostalAddress",
        addressLocality: "十堰市郧阳区",
        addressRegion: "湖北省",
        addressCountry: "CN",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "安阳湖橄榄油",
      url: "https://anyanghu.lovable.app",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="安阳湖橄榄油 — 湖北十堰特级初榨橄榄油"
        description="安阳湖橄榄油，源自湖北十堰郧阳安阳湖油橄榄基地，低温物理冷榨特级初榨橄榄油，提供精品礼盒、团购合作与招商咨询。"
        path="/"
        jsonLd={jsonLd}
      />
      <Navigation />
      <Hero />
      <BrandStatement />
      <Services />
      <About />
      <Portfolio />

      {/* 礼盒定制 */}
      <section id="gift" className="py-32 bg-muted/40">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <Reveal variant="fade-scale" className="relative overflow-hidden">
              <img
                src={giftImage}
                alt="安阳湖橄榄油礼盒"
                loading="lazy"
                className="w-full h-[60vh] object-contain bg-muted p-6"
              />
            </Reveal>
            <Reveal variant="fade-up" delay={120}>
              <ScrollTitle>
              <h2 className="text-minimal text-primary mb-4">GIFT CUSTOMIZATION</h2>
              <h3 className="font-serif text-4xl md:text-5xl font-light text-architectural text-foreground mb-8">
                一份能走进日常三餐的
                <br />
                健康好礼
              </h3>
              </ScrollTitle>
              <p className="text-muted-foreground leading-relaxed mb-6">
                适合节日送礼、走亲访友、敬献父母长辈、商务客户礼赠、企业福利及地方特色礼品。
                我们提供包装定制、Logo 印制、定向团购等灵活方案，让一瓶橄榄油承载心意。
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest hover:bg-primary/90 transition-colors duration-300"
              >
                咨询礼盒定制
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 产业园 / 文旅体验 */}
      <ParkWindow src={heroImage} />

      <Contact />
    </div>
  );
};

export default Index;
