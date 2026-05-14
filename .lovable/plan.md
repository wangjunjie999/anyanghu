# 用 InfiniteMenu 球体重做"品质工艺"流程

## 目标
将 `About.tsx` 右侧单薄的 7 步文字列表，升级为一个**沉浸式 3D 球体探索区**：每个面贴一张工艺现场图，用户拖动旋转，松手吸附到当前工艺，球体旁显示该步骤的详细文案。

## 改动概览

### 1. 新增组件 `src/components/InfiniteMenu.tsx`
- 直接使用用户提供的官方 TS 源码（WebGL2 + gl-matrix）
- 改造点（保持品牌一致）：
  - 中间圆按钮的 `bg-[#00ffff]` / `border-black` → 改用 `hsl(var(--primary))` + `border-primary-foreground`
  - 标题/描述字号在 About 区域内场景下偏大，加 `props.compact` 让标题用 `text-3xl md:text-4xl`、描述用 `text-sm md:text-base`，避免压过页面主标题
  - 标题/描述颜色改用 `text-foreground` / `text-muted-foreground`
  - 移除原 `link` 跳转逻辑（这里不需要外链）；点击中间按钮改为高亮当前工艺、不跳转
- 安装新依赖：`gl-matrix`

### 2. 扩充工艺数据 + 生成 7 张工艺图
在 `About.tsx` 内（或抽到 `src/data/craft.ts`）定义：

```ts
const craftSteps = [
  { title: "油橄榄种植", desc: "海拔 600m 安阳湖畔，PH 7.2 钙质土壤，单株间距 5m，仿生有机栽培。", image: ... },
  { title: "果实成熟", desc: "10 月转色期日均温差 12℃，多酚与单不饱和脂肪酸同步积累至峰值。", image: ... },
  { title: "适时采摘", desc: "破色率 30–50% 的黄金窗口手工采摘，单日入榨，避免果实氧化。", image: ... },
  { title: "8 小时低温冷榨", desc: "全程 ≤ 27℃ 物理冷榨，从枝头到油罐 < 8 小时，锁住鲜果香气。", image: ... },
  { title: "品质检测", desc: "酸价、过氧化值、多酚含量逐批送检，特级初榨标准 100% 通过。", image: ... },
  { title: "灌装储存", desc: "氮气保护避光灌装，恒温 18℃ 暗仓陈化，风味稳定 24 个月。", image: ... },
  { title: "进入家庭餐桌", desc: "从安阳湖畔到您的一日三餐，每一滴都可溯源至单一产地与批次。", image: ... },
];
```

用 `imagegen` 生成 7 张 1:1 工艺纪实风格图（暖色调、与现有 region-* 图保持统一摄影质感），存到 `src/assets/craft-01.jpg` … `craft-07.jpg`。

### 3. 改造 `src/components/About.tsx`
**布局调整**：从 2 列变 1 列纵向叙事，给球体足够空间。

```text
┌─────────────────────────────────────────┐
│  BRAND STORY                            │
│  从安阳湖畔，到一日三餐    ← 左：标题+正文 │
│  公司介绍两段                            │
│                                          │
│  成立时间 2017 │ 省级龙头/国家高新       │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  CRAFTSMANSHIP                          │
│  品质工艺 — 拖动球体探索每一步          │
│                                          │
│   ┌─────────────────────────────┐        │
│   │                             │        │
│   │      [InfiniteMenu 球体]    │ 高 600px│
│   │                             │        │
│   └─────────────────────────────┘        │
│                                          │
│  底部 7 个小圆点导航 / 当前 step 标签    │
└─────────────────────────────────────────┘
```

- 上半部分（公司介绍）保留为 2 列网格（左文本、右"成立时间/荣誉"卡片），删掉右侧的旧 ol 列表
- 下半部分新建 `<div className="mt-32">`，包含小标题、副标题，和一个 `h-[600px] relative` 容器承载 `<InfiniteMenu items={craftSteps} scale={1} />`
- 移动端：球体高度降为 `h-[420px]`，并在球下方追加一段"由于互动需要更多空间，可访问完整流程图"的折叠卡片（包含原 7 步文字列表），保证无 WebGL/小屏体验下仍可读

### 4. 无障碍 & SEO 兜底
- 球体是 canvas，对 SEO 不可见。在球体容器内加 `<ol className="sr-only">` 把 7 步文字+描述以语义列表形式输出，供爬虫和读屏用户读取
- canvas 加 `role="img"` 和 `aria-label="品质工艺 7 步流程交互式球体"`

## 技术细节
- 依赖：`bun add gl-matrix`
- 性能：组件 unmount 时需要补一个 cleanup（取消 `requestAnimationFrame`、释放 WebGL 资源）。在源码 useEffect 的 return 中加 `cancelAnimationFrame` + `gl.getExtension('WEBGL_lose_context')?.loseContext()`，避免离开页面后 GPU 占用
- `crossOrigin = 'anonymous'`：本地 `src/assets` 通过 import 进来是同源 blob URL，没问题
- `scale` 在 About 区使用 `1.0`；如果发现球体太大可调到 `1.1`
- 图集纹理大小：7 张 → atlasSize=3，3×3×512 = 1536px，移动端可接受

## 文件改动清单
- 新增 `src/components/InfiniteMenu.tsx`（~900 行 + 适配改动）
- 新增 `src/assets/craft-01.jpg` … `craft-07.jpg`（7 张工艺图，AI 生成）
- 编辑 `src/components/About.tsx`（重排布局、嵌入球体、扩充文案、加 sr-only 兜底）
- 编辑 `package.json`（新增 `gl-matrix` 依赖）

## 不做的事
- 不改顶部导航（GooeyNav 保留）
- 不动 Hero、产地优势、产品中心
- 不引入路由跳转逻辑（球体仅作展示+探索）
