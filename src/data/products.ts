import image0 from "../assets/products/coratina-glass-125ml.jpg.asset.json";
import image1 from "../assets/products/coratina-glass-500ml.jpg.asset.json";
import image2 from "../assets/products/coratina-tin-500ml.jpg.asset.json";
import image3 from "../assets/products/coratina-tin-1000ml.jpg.asset.json";
import image4 from "../assets/products/classic-glass-125ml.jpg.asset.json";
import image5 from "../assets/products/classic-glass-500ml.jpg.asset.json";
import image6 from "../assets/products/classic-tin-500ml.jpg.asset.json";
import image7 from "../assets/products/classic-tin-1000ml.jpg.asset.json";
import image8 from "../assets/products/gift-classic-500mlx2.jpg.asset.json";
import image9 from "../assets/products/gift-classic-1lx2.jpg.asset.json";
import image10 from "../assets/products/gift-coratina-500mlx2.jpg.asset.json";
import image11 from "../assets/products/gift-coratina-1lx2.jpg.asset.json";

export type ProductSeries = "coratina" | "classic" | "gift";
export interface Product {
  id: string;
  series: ProductSeries;
  name: string;
  shortName: string;
  spec: string;
  pack: "玻璃瓶" | "马口铁" | "礼盒";
  image: string;
  params: string[];
  description: string;
}

const coratinaParams = ["品种 科拉蒂单品种橄榄果", "酸度 ≤ 0.5%", "橄榄多酚 368.67 mg/kg"];
const classicParams = ["品种 奇迹、皮瓜尔、皮削利、阿尔波萨纳混合", "酸度 ≤ 0.5%"];

export const productSeries: { id: ProductSeries; name: string; label: string; description: string }[] = [
  { id: "coratina", name: "科拉蒂单品种高多酚系列", label: "科拉蒂单品种", description: "科拉蒂单品种橄榄果冷榨，橄榄多酚 368.67 mg/kg，提供玻璃瓶与避光马口铁包装。" },
  { id: "classic", name: "经典款系列", label: "经典款", description: "奇迹、皮瓜尔、皮削利、阿尔波萨纳混合冷榨，酸度 ≤ 0.5%，多种容量适合日常餐桌。" },
  { id: "gift", name: "礼盒系列", label: "礼盒", description: "经典款与科拉蒂单品种两种选择，500ml×2 与 1L×2 礼盒满足送礼及商务礼赠需求。" },
];

export function parseProductSeries(value: string | null): ProductSeries | "all" {
  return productSeries.some((series) => series.id === value) ? value as ProductSeries : "all";
}

export const products: Product[] = [
  { id: "coratina-glass-125ml", series: "coratina", name: "安阳湖科拉蒂单品种高多酚特级初榨橄榄油玻璃瓶装125ml", shortName: "科拉蒂 玻璃瓶装 125ml", spec: "125ml", pack: "玻璃瓶", image: image0.url, params: [...coratinaParams], description: "科拉蒂单品种冷榨，125ml 玻璃瓶装适合尝鲜。" },
  { id: "coratina-glass-500ml", series: "coratina", name: "安阳湖科拉蒂单品种高多酚特级初榨橄榄油玻璃瓶装500ml", shortName: "科拉蒂 玻璃瓶装 500ml", spec: "500ml", pack: "玻璃瓶", image: image1.url, params: [...coratinaParams], description: "科拉蒂单品种冷榨，500ml 玻璃瓶装适合日常餐桌。" },
  { id: "coratina-tin-500ml", series: "coratina", name: "安阳湖科拉蒂单品种高多酚特级初榨橄榄油马口铁装500ml", shortName: "科拉蒂 马口铁装 500ml", spec: "500ml", pack: "马口铁", image: image2.url, params: [...coratinaParams], description: "科拉蒂单品种冷榨，500ml 马口铁避光包装适合日常用油。" },
  { id: "coratina-tin-1000ml", series: "coratina", name: "安阳湖科拉蒂单品种高多酚特级初榨橄榄油马口铁装1000ml", shortName: "科拉蒂 马口铁装 1000ml", spec: "1000ml", pack: "马口铁", image: image3.url, params: [...coratinaParams], description: "科拉蒂单品种冷榨，1000ml 马口铁避光家庭装。" },
  { id: "classic-glass-125ml", series: "classic", name: "安阳湖特级初榨橄榄油经典款玻璃瓶装125ml", shortName: "经典款 玻璃瓶装 125ml", spec: "125ml", pack: "玻璃瓶", image: image4.url, params: [...classicParams], description: "多品种混合冷榨，125ml 玻璃瓶装适合尝鲜。" },
  { id: "classic-glass-500ml", series: "classic", name: "安阳湖特级初榨橄榄油经典款玻璃瓶装500ml", shortName: "经典款 玻璃瓶装 500ml", spec: "500ml", pack: "玻璃瓶", image: image5.url, params: [...classicParams], description: "多品种混合冷榨，500ml 玻璃瓶装适合日常用油。" },
  { id: "classic-tin-500ml", series: "classic", name: "安阳湖特级初榨橄榄油经典款马口铁装500ml", shortName: "经典款 马口铁装 500ml", spec: "500ml", pack: "马口铁", image: image6.url, params: [...classicParams], description: "多品种混合冷榨，500ml 马口铁避光包装适合日常餐桌。" },
  { id: "classic-tin-1000ml", series: "classic", name: "安阳湖特级初榨橄榄油经典款马口铁装1000ml", shortName: "经典款 马口铁装 1000ml", spec: "1000ml", pack: "马口铁", image: image7.url, params: [...classicParams], description: "多品种混合冷榨，1000ml 马口铁避光包装适合家庭使用。" },
  { id: "gift-classic-500mlx2", series: "gift", name: "安阳湖特级初榨橄榄油经典款礼盒 500ml×2", shortName: "经典款礼盒 500ml×2", spec: "500ml×2", pack: "礼盒", image: image8.url, params: [...classicParams], description: "经典款多品种混合冷榨，500ml 双瓶礼盒适合送礼。" },
  { id: "gift-classic-1lx2", series: "gift", name: "安阳湖特级初榨橄榄油经典款商务礼盒 1L×2", shortName: "经典款商务礼盒 1L×2", spec: "1L×2", pack: "礼盒", image: image9.url, params: [...classicParams], description: "经典款多品种混合冷榨，1L 双罐商务礼盒适合商务礼赠。" },
  { id: "gift-coratina-500mlx2", series: "gift", name: "安阳湖科拉蒂单品种高多酚特级初榨橄榄油礼盒 500ml×2", shortName: "科拉蒂礼盒 500ml×2", spec: "500ml×2", pack: "礼盒", image: image10.url, params: [...coratinaParams], description: "科拉蒂单品种高多酚橄榄油，500ml 双瓶礼盒适合送礼。" },
  { id: "gift-coratina-1lx2", series: "gift", name: "安阳湖科拉蒂单品种高多酚特级初榨橄榄油礼盒 1L×2", shortName: "科拉蒂礼盒 1L×2", spec: "1L×2", pack: "礼盒", image: image11.url, params: [...coratinaParams], description: "科拉蒂单品种高多酚橄榄油，1L 双罐礼盒适合家庭礼赠。" },
 ];

export const homepageShowcases = [
  { id: "coratina-glass-500ml", name: productSeries[0].name, series: "coratina" as const, english: "SINGLE VARIETAL", spec: "125ml / 500ml 玻璃瓶装 · 500ml / 1000ml 马口铁装" },
  { id: "classic-glass-500ml", name: productSeries[1].name, series: "classic" as const, english: "CLASSIC EVOO", spec: "125ml / 500ml 玻璃瓶装 · 500ml / 1000ml 马口铁装" },
  { id: "gift-coratina-500mlx2", name: "科拉蒂礼盒", series: "gift" as const, english: "CORATINA GIFT BOX", spec: "500ml×2 / 1L×2" },
  { id: "gift-classic-500mlx2", name: "经典款礼盒", series: "gift" as const, english: "CLASSIC GIFT BOX", spec: "礼盒 500ml×2 / 商务礼盒 1L×2" },
].map((showcase) => {
  const product = products.find((item) => item.id === showcase.id);
  if (!product) throw new Error(`Missing showcase product: ${showcase.id}`);
  return { ...product, ...showcase };
});
