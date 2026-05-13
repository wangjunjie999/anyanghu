import Navigation from "@/components/Navigation";
import Services from "@/components/Services";

const ServicesPage = () => {
  const craft = [
    { step: "01", title: "油橄榄种植", desc: "适宜品种选育，标准化田间管理。" },
    { step: "02", title: "果实成熟", desc: "依据成熟度科学排期，确保最佳风味。" },
    { step: "03", title: "适时采摘", desc: "人工与机械结合，最大限度保护鲜果。" },
    { step: "04", title: "8 小时低温冷榨", desc: "采摘后 8 小时内进入冷榨车间。" },
    { step: "05", title: "品质检测", desc: "酸度、多酚与感官多维度检测。" },
    { step: "06", title: "灌装储存", desc: "避光低温，锁住天然营养与清香。" },
    { step: "07", title: "进入家庭餐桌", desc: "全程可追溯，从产地到一日三餐。" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <Services />
        <section className="py-32 bg-muted/40">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-16">
                <h2 className="text-minimal text-primary mb-4">CRAFTSMANSHIP</h2>
                <h3 className="font-serif text-4xl md:text-6xl font-light text-architectural text-foreground">
                  品质工艺
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
                {craft.map((c) => (
                  <div key={c.step} className="border-l-2 border-primary/40 pl-6">
                    <p className="text-minimal text-primary mb-2">{c.step}</p>
                    <h4 className="font-serif text-2xl font-light text-foreground mb-2">{c.title}</h4>
                    <p className="text-muted-foreground">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;
