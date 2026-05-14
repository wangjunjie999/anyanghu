import Reveal from "@/components/Reveal";

const About = () => {
  const craft = [
    "油橄榄种植",
    "果实成熟",
    "适时采摘",
    "8 小时低温冷榨",
    "品质检测",
    "灌装储存",
    "进入家庭餐桌",
  ];

  return (
    <section id="about" className="py-32 bg-muted/40">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
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

            <div className="space-y-12">
              <div>
                <h4 className="text-minimal text-primary mb-6">品质工艺</h4>
                <ol className="space-y-4">
                  {craft.map((step, i) => (
                    <Reveal as="li" key={step} variant="fade-rotate" delay={i * 80} className="flex items-baseline gap-4 border-l-2 border-primary/40 pl-6">
                      <span className="text-minimal text-primary w-8">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-foreground text-lg font-light">{step}</span>
                    </Reveal>
                  ))}
                </ol>
              </div>

              <div className="pt-8 border-t border-border grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">成立时间</h4>
                  <p className="font-serif text-xl text-foreground">2017</p>
                </div>
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">荣誉资质</h4>
                  <p className="text-foreground">省级龙头企业 · 国家高新企业</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
