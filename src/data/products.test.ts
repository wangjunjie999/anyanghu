// @ts-ignore Bun's test module is provided by the test runner, not the browser app.
import { describe, expect, test } from "bun:test";
import { products, homepageShowcases, parseProductSeries } from "./products";

const officialNames = [
  "安阳湖科拉蒂单品种高多酚特级初榨橄榄油玻璃瓶装125ml",
  "安阳湖科拉蒂单品种高多酚特级初榨橄榄油玻璃瓶装500ml",
  "安阳湖科拉蒂单品种高多酚特级初榨橄榄油马口铁装500ml",
  "安阳湖科拉蒂单品种高多酚特级初榨橄榄油马口铁装1000ml",
  "安阳湖特级初榨橄榄油经典款玻璃瓶装125ml",
  "安阳湖特级初榨橄榄油经典款玻璃瓶装500ml",
  "安阳湖特级初榨橄榄油经典款马口铁装500ml",
  "安阳湖特级初榨橄榄油经典款马口铁装1000ml",
  "安阳湖特级初榨橄榄油经典款礼盒 500ml×2",
  "安阳湖特级初榨橄榄油经典款商务礼盒 1L×2",
  "安阳湖科拉蒂单品种高多酚特级初榨橄榄油礼盒 500ml×2",
  "安阳湖科拉蒂单品种高多酚特级初榨橄榄油礼盒 1L×2",
];

describe("official catalog rules", () => {
  test("exactly twelve unique products, four in each series", () => {
    expect(products).toHaveLength(12);
    expect(new Set(products.map((p) => p.id)).size).toBe(12);
    for (const series of ["coratina", "classic", "gift"]) {
      expect(products.filter((p) => p.series === series)).toHaveLength(4);
    }
  });
  test("official names match exactly, including gift spacing", () => {
    expect(products.map((p) => p.name)).toEqual(officialNames);
  });
  test("every product has the specified capacity and packaging", () => {
    expect(products.map((p) => [p.spec, p.pack])).toEqual([
      ["125ml", "玻璃瓶"], ["500ml", "玻璃瓶"], ["500ml", "马口铁"], ["1000ml", "马口铁"],
      ["125ml", "玻璃瓶"], ["500ml", "玻璃瓶"], ["500ml", "马口铁"], ["1000ml", "马口铁"],
      ["500ml×2", "礼盒"], ["1L×2", "礼盒"], ["500ml×2", "礼盒"], ["1L×2", "礼盒"],
    ]);
  });
  test("all coratina products and gifts retain their official parameters", () => {
    const coratina = products.filter((p) => p.id.includes("coratina"));
    expect(coratina).toHaveLength(6);
    for (const product of coratina) expect(product.params).toEqual([
      "品种 科拉蒂单品种橄榄果", "酸度 ≤ 0.5%", "橄榄多酚 368.67 mg/kg",
    ]);
  });
  test("all classic products and gifts retain their official parameters", () => {
    const classic = products.filter((p) => p.id.includes("classic"));
    expect(classic).toHaveLength(6);
    for (const product of classic) expect(product.params).toEqual([
      "品种 奇迹、皮瓜尔、皮削利、阿尔波萨纳混合", "酸度 ≤ 0.5%",
    ]);
  });
  test("URL selection accepts three real series and defaults invalid values to all", () => {
    expect(parseProductSeries("coratina")).toBe("coratina");
    expect(parseProductSeries("classic")).toBe("classic");
    expect(parseProductSeries("gift")).toBe("gift");
    expect(parseProductSeries(null)).toBe("all");
    expect(parseProductSeries("seasonal")).toBe("all");
  });
  test("homepage links derive the four requested products and series", () => {
    expect(homepageShowcases.map((p) => [p.id, p.series])).toEqual([
      ["coratina-glass-500ml", "coratina"], ["classic-glass-500ml", "classic"],
      ["gift-coratina-500mlx2", "gift"], ["gift-classic-500mlx2", "gift"],
    ]);
  });
});