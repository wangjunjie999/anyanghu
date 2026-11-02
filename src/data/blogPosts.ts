export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  /** Optional article photo gallery shown below the content (image URLs). */
  gallery?: string[];
}

import blogPour from "@/assets/blog-sustainable-architecture.jpg";
import newsCooking1 from "@/assets/news/news-cooking-1.jpg.asset.json";
import newsCooking2 from "@/assets/news/news-cooking-2.jpg.asset.json";
import newsCooking3 from "@/assets/news/news-cooking-3.jpg.asset.json";
import newsCooking4 from "@/assets/news/news-cooking-4.jpg.asset.json";
import newsCooking5 from "@/assets/news/news-cooking-5.jpg.asset.json";
import baseAerial1 from "@/assets/base/base-aerial-1.jpg.asset.json";
import baseAerial2 from "@/assets/base/base-aerial-2.jpg.asset.json";
import baseLake from "@/assets/base/base-lake.jpg.asset.json";
import basePark from "@/assets/base/base-industrial-park.jpg.asset.json";
import newsProcess1 from "@/assets/news/news-process-1.jpg.asset.json";
import newsProcess2 from "@/assets/news/news-process-2.jpg.asset.json";
import newsProcess3 from "@/assets/news/news-process-3.jpg.asset.json";
import newsProcess4 from "@/assets/news/news-process-4.jpg.asset.json";
import newsProcess5 from "@/assets/news/news-process-5.jpg.asset.json";
import newsProcess6 from "@/assets/news/news-process-6.jpg.asset.json";
import newsGift1 from "@/assets/news/news-gift-1.jpg.asset.json";
import newsGift2 from "@/assets/news/news-gift-2.jpg.asset.json";
import newsGift3 from "@/assets/news/news-gift-3.jpg.asset.json";

export const blogPosts: BlogPost[] = [
  {
    id: "anyanghu-base-news",
    title: "安阳湖油橄榄基地动态",
    excerpt: "走进秦巴山脉腹地的安阳湖油橄榄基地，了解最新的种植、采摘与冷榨进展。",
    content: `# 安阳湖油橄榄基地动态\n\n安阳湖油橄榄基地位于湖北十堰郧阳，依山傍水，是国内具有代表性的油橄榄种植基地之一。\n\n基地围绕油橄榄良种繁育、规模化种植、低温冷榨与品质检测，持续推进标准化和数字化管理。\n\n本季鲜果长势良好，采摘与冷榨工作有序展开，欢迎合作伙伴莅临基地参观。`,
    author: "安阳湖品牌中心",
    date: "2024-10-20",
    readTime: "4 分钟",
    category: "基地动态",
    image: baseAerial1.url,
    gallery: [baseAerial2.url, baseLake.url, basePark.url],
  },
  {
    id: "what-is-evoo",
    title: "什么是特级初榨橄榄油",
    excerpt: "酸度、多酚、冷榨工艺……一篇文章读懂特级初榨橄榄油的核心标准。",
    content: `# 什么是特级初榨橄榄油\n\n特级初榨橄榄油（Extra Virgin Olive Oil）指通过物理冷榨方式直接从新鲜橄榄果中获得，且酸度（以油酸计）≤ 0.8% 的橄榄油。\n\n它保留了橄榄果天然的多酚、维生素 E 和清新香气，是橄榄油中的最高等级。\n\n安阳湖特级初榨橄榄油酸度 ≤ 0.5%，部分单品种橄榄多酚高达 368.67 mg/kg。`,
    author: "安阳湖橄榄油知识库",
    date: "2024-09-12",
    readTime: "5 分钟",
    category: "橄榄油知识",
    image: blogPour,
  },
  {
    id: "cooking-with-olive-oil",
    title: "橄榄油适合哪些烹饪方式",
    excerpt: "凉拌、蘸食、煎炒、烘焙……不同场景下橄榄油的正确打开方式。",
    content: `# 橄榄油适合哪些烹饪方式\n\n特级初榨橄榄油保留了丰富的香气与营养，建议优先用于：\n\n- 凉拌沙拉、蔬菜\n- 蘸食面包\n- 出锅淋香\n- 中低温煎炒\n\n日常烹饪用油可选择安阳湖瓶装系列，礼盒款则更适合宴客与馈赠。`,
    author: "安阳湖生活馆",
    date: "2024-08-18",
    readTime: "4 分钟",
    category: "橄榄油知识",
    image: newsCooking1.url,
    gallery: [
      newsCooking2.url,
      newsCooking3.url,
      newsCooking4.url,
      newsCooking5.url,
    ],
  },
  {
    id: "gift-scenarios",
    title: "安阳湖橄榄油礼盒适合哪些场景",
    excerpt: "从中秋春节到企业福利，一份能走进日常三餐的健康好礼。",
    content: `# 安阳湖橄榄油礼盒适合哪些场景\n\n- 节日送礼：中秋、春节、端午等传统节日\n- 走亲访友：拜访长辈、朋友家宴\n- 敬献父母：关注健康，传递关爱\n- 商务礼赠：客户答谢、合作伙伴致意\n- 企业福利：员工节日礼品\n- 地方特色礼品：体现湖北十堰产地文化\n\n安阳湖科拉蒂高端礼盒与经典款礼盒可灵活搭配，支持企业定制。`,
    author: "安阳湖礼盒定制",
    date: "2024-07-05",
    readTime: "3 分钟",
    category: "礼盒场景",
    image: newsGift1.url,
    gallery: [newsGift2.url, newsGift3.url],
  },
  {
    id: "from-fruit-to-bottle",
    title: "从一颗橄榄果到一瓶橄榄油的制作过程",
    excerpt: "种植、采摘、冷榨、检测、灌装——完整呈现安阳湖橄榄油的诞生旅程。",
    content: `# 从一颗橄榄果到一瓶橄榄油\n\n1. **油橄榄种植**：选择适宜品种，标准化田间管理。\n2. **果实成熟**：等待橄榄果达到最佳成熟度。\n3. **适时采摘**：人工与机械结合，最大程度保护果实。\n4. **8 小时低温冷榨**：鲜果采摘后 8 小时内进入冷榨车间，物理压榨保留风味。\n5. **品质检测**：酸度、多酚、感官全维度检测。\n6. **灌装储存**：避光储存，锁住天然营养。\n7. **进入家庭餐桌**：从安阳湖畔，到一日三餐。`,
    author: "安阳湖品质中心",
    date: "2024-06-10",
    readTime: "6 分钟",
    category: "基地动态",
    image: newsProcess1.url,
    gallery: [
      newsProcess2.url,
      newsProcess3.url,
      newsProcess4.url,
      newsProcess5.url,
      newsProcess6.url,
    ],
  },
];
