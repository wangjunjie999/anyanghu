import Reveal from "@/components/Reveal";

const Services = () => {
  const advantages = [
    {
      number: "01",
      title: "好水源",
      description: "南水北调中线核心水源地，水质清澈，生态环境优越，为油橄榄生长提供天然滋养。",
    },
    {
      number: "02",
      title: "好气候",
      description: "地处北纬32°油橄榄适宜生长带，光照充足，昼夜温差明显，利于油脂与多酚积累。",
    },
    {
      number: "03",
      title: "好生态",
      description: "山水环绕、林木葱郁，空气清透，远离工业污染，孕育干净纯粹的橄榄果。",
    },
    {
      number: "04",
      title: "好管理",
      description: "从种植、采摘、运输、冷榨到品质检测，全流程可追溯的标准化品质管理。",
    },
  ];

  return (
    <section id="services" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-minimal text-primary mb-4">PRODUCING REGION</h2>
            <h3 className="font-serif text-4xl md:text-6xl font-light text-architectural text-foreground">
              产地优势
            </h3>
            <p className="mt-6 text-muted-foreground max-w-2xl">
              一瓶好橄榄油，始于一片好土地。安阳湖油橄榄基地坐落于秦巴山脉与汉江交汇处，
              得天独厚的水土与气候，孕育出具有产地特色的中国本土橄榄油。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
            {advantages.map((s, i) => (
              <Reveal key={s.number} variant="fade-up" delay={i * 100} className="group">
                <div className="flex items-start space-x-6">
                  <span className="text-minimal text-primary font-medium">{s.number}</span>
                  <div>
                    <h4 className="font-serif text-2xl font-light mb-4 text-architectural text-foreground group-hover:text-primary transition-colors duration-500">
                      {s.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
