import Reveal from "@/components/Reveal";
import InfiniteMenu from "@/components/InfiniteMenu";
import craft01 from "@/assets/craft-01.jpg";
import craft02 from "@/assets/craft-02.jpg";
import craft03 from "@/assets/craft-03.jpg";
import craft04 from "@/assets/craft-04.jpg";
import craft05 from "@/assets/craft-05.jpg";
import craft06 from "@/assets/craft-06.jpg";
import craft07 from "@/assets/craft-07.jpg";

const craftSteps = [
  {
    image: craft01,
    link: "",
    title: "油橄榄种植",
    description: "海拔 600m 安阳湖畔，钙质土壤、昼夜温差显著，仿生有机栽培，单株间距 5m 保证通风采光。",
  },
  {
    image: craft02,
    link: "",
    title: "果实成熟",
    description: "10 月转色期日均温差 12℃，多酚与单不饱和脂肪酸同步积累至峰值，孕育油橄榄独特的果香与回甘。",
  },
  {
    image: craft03,
    link: "",
    title: "适时采摘",
    description: "破色率 30–50% 的黄金窗口手工采摘，单日入榨，避免果实在运输与堆放中氧化变质。",
  },
  {
    image: craft04,
    link: "",
    title: "8 小时低温冷榨",
    description: "全程 ≤ 27℃ 物理冷榨，从枝头到油罐 < 8 小时，最大程度锁住鲜果香气与营养活性。",
  },
  {
    image: craft05,
    link: "",
    title: "品质检测",
    description: "酸价、过氧化值、多酚含量逐批送检，特级初榨标准 100% 通过，每瓶可溯源至单一产地与批次。",
  },
  {
    image: craft06,
    link: "",
    title: "灌装储存",
    description: "深色玻璃瓶氮气保护避光灌装，恒温 18℃ 暗仓陈化，风味与营养稳定保持 24 个月。",
  },
  {
    image: craft07,
    link: "",
    title: "进入家庭餐桌",
    description: "从安阳湖畔到您的一日三餐，每一滴都承载产地、工艺与匠心，伴中国家庭健康日常。",
  },
];

const About = () => {
  return (
    <section id="about" className="py-32 bg-muted/40">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* 上半部分：品牌叙事 */}
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

            <div className="md:pt-24">
              <div className="grid grid-cols-2 gap-8 pb-8 border-b border-border">
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">成立时间</h4>
                  <p className="font-serif text-3xl text-foreground font-light">2017</p>
                </div>
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">荣誉资质</h4>
                  <p className="text-foreground leading-relaxed">省级龙头企业 · 国家高新企业</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">核心基地</h4>
                  <p className="text-foreground leading-relaxed">湖北十堰郧阳安阳湖</p>
                </div>
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">工艺标准</h4>
                  <p className="text-foreground leading-relaxed">8 小时低温冷榨 · 特级初榨</p>
                </div>
              </div>
            </div>
          </div>

          {/* 下半部分：品质工艺球体探索 */}
          <Reveal as="div" variant="fade-up" className="mt-32 md:mt-40">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <h2 className="text-minimal text-primary mb-4">CRAFTSMANSHIP</h2>
                <h3 className="font-serif text-3xl md:text-5xl font-light text-architectural text-foreground">
                  品质工艺 · 七步溯源
                </h3>
              </div>
              <p className="text-muted-foreground text-sm md:text-base max-w-md md:text-right">
                拖动球体探索每一道工序，每一颗油橄榄从安阳湖畔到家庭餐桌的完整旅程。
              </p>
            </div>

            <div className="relative w-full h-[520px] md:h-[640px] rounded-sm overflow-hidden bg-background border border-border">
              <InfiniteMenu items={craftSteps} />
            </div>

            {/* SEO / 无障碍兜底列表 */}
            <ol className="sr-only">
              {craftSteps.map((step, i) => (
                <li key={step.title}>
                  第 {i + 1} 步 — {step.title}：{step.description}
                </li>
              ))}
            </ol>

            {/* 移动端可读流程概览 */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-7 gap-3 md:gap-4">
              {craftSteps.map((step, i) => (
                <div
                  key={step.title}
                  className="border-l-2 border-primary/40 pl-3 py-1"
                >
                  <div className="text-minimal text-primary text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-foreground text-sm md:text-base font-light mt-1">
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
