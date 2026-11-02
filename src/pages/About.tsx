import Navigation from "@/components/Navigation";
import SplitText from "@/components/SplitText";
import Reveal from "@/components/Reveal";
import About from "@/components/About";
import SEO from "@/components/SEO";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="品牌故事 · 安阳湖橄榄油"
        description="十堰泽盟农业开发有限公司成立于 2017 年，是湖北省林业产业化省级重点龙头企业、国家高新技术企业，专注本土特级初榨橄榄油。"
        path="/about"
      />
      <Navigation />
      <div className="pt-24">
        <h1 className="sr-only">品牌故事 — 十堰泽盟农业开发有限公司</h1>
        <About />
        <section className="py-32 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-minimal text-primary mb-6">HONORS</h2>
              <SplitText
                as="h3"
                text="荣誉与资质"
                stagger={60}
                className="block font-serif text-4xl md:text-5xl font-light text-architectural text-foreground py-2 mb-12"
              />
              <div className="grid md:grid-cols-2 gap-10 text-muted-foreground leading-relaxed">
                <Reveal as="p" delay={0}>湖北省林业产业化省级重点龙头企业</Reveal>
                <Reveal as="p" delay={80}>国家高新技术企业</Reveal>
                <Reveal as="p" delay={160}>中国本土橄榄油品牌建设示范单位</Reveal>
                <Reveal as="p" delay={240}>南水北调水源地生态产业代表企业</Reveal>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
