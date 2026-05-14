import Reveal from "@/components/Reveal";
import ScrollFloat from "@/components/ScrollFloat";
import GradualBlur from "@/components/GradualBlur";
import waterImg from "@/assets/region-water.jpg";
import climateImg from "@/assets/region-climate.jpg";
import ecologyImg from "@/assets/region-ecology.jpg";
import managementImg from "@/assets/region-management.jpg";

const Services = () => {
  const advantages = [
    {
      number: "01",
      title: "好水源",
      label: "WATER",
      description: "南水北调中线核心水源地，水质清澈，生态环境优越，为油橄榄生长提供天然滋养。",
      image: waterImg,
    },
    {
      number: "02",
      title: "好气候",
      label: "CLIMATE",
      description: "地处北纬32°油橄榄适宜生长带，光照充足，昼夜温差明显，利于油脂与多酚积累。",
      image: climateImg,
    },
    {
      number: "03",
      title: "好生态",
      label: "ECOLOGY",
      description: "山水环绕、林木葱郁，空气清透，远离工业污染，孕育干净纯粹的橄榄果。",
      image: ecologyImg,
    },
    {
      number: "04",
      title: "好管理",
      label: "MANAGEMENT",
      description: "省级林业龙头与国家高新技术企业认证，建立单批次溯源与第三方品控体系，让每一瓶都有据可查。",
      image: managementImg,
    },
  ];

  return (
    <section id="services" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-minimal text-primary mb-6">PRODUCING REGION</h2>
            <ScrollFloat
              containerClassName="my-0 py-4 md:py-6"
              textClassName="font-serif text-4xl md:text-6xl font-light text-architectural text-foreground"
              stagger={0.05}
              animationDuration={1.2}
              scrollStart="top bottom-=5%"
              scrollEnd="bottom center+=10%"
            >
              产地优势
            </ScrollFloat>
            <p className="mt-10 md:mt-12 text-muted-foreground max-w-2xl">
              一瓶好橄榄油，始于一片好土地。安阳湖油橄榄基地坐落于秦巴山脉与汉江交汇处，
              得天独厚的水土与气候，孕育出具有产地特色的中国本土橄榄油。
            </p>
          </div>

          <div className="space-y-24 md:space-y-32">
            {advantages.map((s, i) => {
              const reverse = i % 2 === 1;
              return (
                <div
                  key={s.number}
                  className={`grid md:grid-cols-12 gap-10 md:gap-16 items-center`}
                >
                  <Reveal
                    variant="fade-scale"
                    className={`md:col-span-7 ${reverse ? "md:order-2" : ""}`}
                  >
                    <div className="relative overflow-hidden bg-muted group">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        width={1280}
                        height={896}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      />
                      <GradualBlur
                        position="bottom"
                        height="3rem"
                        strength={1.2}
                        divCount={4}
                        curve="bezier"
                        zIndex={2}
                      />
                    </div>
                  </Reveal>

                  <Reveal
                    variant="fade-up"
                    delay={120}
                    className={`md:col-span-5 ${reverse ? "md:order-1" : ""}`}
                  >
                    <div className="space-y-6">
                      <div className="flex items-baseline gap-4">
                        <span className="font-serif text-5xl md:text-6xl font-light text-primary leading-none">
                          {s.number}
                        </span>
                        <span className="text-minimal text-muted-foreground">
                          {s.label}
                        </span>
                      </div>
                      <h4 className="font-serif text-3xl md:text-4xl font-light text-architectural text-foreground">
                        {s.title}
                      </h4>
                      <div className="w-12 h-px bg-primary/60" />
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {s.description}
                      </p>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
