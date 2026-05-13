import Navigation from "@/components/Navigation";
import About from "@/components/About";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <About />
        <section className="py-32 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-minimal text-primary mb-4">HONORS</h2>
              <h3 className="font-serif text-4xl md:text-5xl font-light text-architectural text-foreground mb-12">
                荣誉与资质
              </h3>
              <div className="grid md:grid-cols-2 gap-10 text-muted-foreground leading-relaxed">
                <p>湖北省林业产业化省级重点龙头企业</p>
                <p>国家高新技术企业</p>
                <p>中国本土橄榄油品牌建设示范单位</p>
                <p>南水北调水源地生态产业代表企业</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
