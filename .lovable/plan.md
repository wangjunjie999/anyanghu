
## 改造目标

在保留现有项目目录结构、路由、组件划分和交互逻辑的前提下，将整个网站从「ARCH STUDIO 建筑工作室」内容替换为「安阳湖橄榄油 / 十堰泽盟农业开发有限公司」品牌官网。不新建页面框架，不删除可复用组件，只做品牌视觉、文案、图片替换以及必要的小幅扩展。

## 保留的原有结构

路由保持不变（沿用 `src/App.tsx`）：
- `/` 首页（单页滚动：Hero + Services + About + Portfolio + Contact）
- `/work` `/services` `/about` `/contact` `/blog` `/blog/:id` 子页面
- `NotFound` 兜底

组件划分保持不变：
- `Navigation`、`Hero`、`Services`、`About`、`Portfolio`、`Contact`、`ThemeToggle`、`ThemeProvider`、所有 `ui/*`
- 单页滚动 + 多路由的混合结构保留
- 顶部导航、主题切换、滚动指示器、卡片 hover、图片缩放等交互逻辑全部保留

## 视觉系统改造（`src/index.css` + `tailwind.config.ts`）

只调整 CSS 变量和少量工具类，不改 token 名，所有组件无需改色值类名：

- `--background`：米白 (≈ `40 30% 97%`)
- `--foreground` / 标题色：深墨绿 (≈ `120 35% 12%`)
- `--primary`：橄榄绿 (≈ `82 35% 32%`)
- `--primary-foreground`：米白
- `--muted`：浅灰白 (≈ `40 20% 94%`)
- `--accent`：浅金 (≈ `42 55% 70%`)
- `--border`：暖灰 (≈ `40 15% 88%`)
- 暗色模式同步调整为深墨绿底 + 橄榄绿/浅金点缀
- `--gradient-hero` / `--gradient-overlay` 改为墨绿到透明的渐变
- 字体：标题使用 `"Noto Serif SC", "Source Han Serif", serif`（中文衬线，质感克制），正文使用 `"Noto Sans SC", system-ui`，在 `index.html` 引入 Google Fonts，并在 `tailwind.config` 加 `fontFamily.serif/sans`
- 保留 `.text-architectural` `.text-minimal` `.reveal` 等工具类，仅微调字距

## 内容映射（按现有组件替换文案）

### `src/components/Navigation.tsx`
- 品牌名 `ARCH STUDIO` → `安阳湖橄榄油`
- 菜单：`产品中心 / 品牌故事 / 产地优势 / 礼盒定制 / 资讯 / 联系我们`
- 路由保持 `/work` `/services` `/about` `/blog` `/contact`，仅替换显示文字
- 保留 ThemeToggle、移动端菜单逻辑

### `src/components/Hero.tsx`
- 主标题：`安阳湖橄榄油`
- 副标题：用户提供的"源自湖北十堰郧阳安阳湖油橄榄基地…"全文
- 两个按钮：`了解产品`（锚 `#work`）/ `查看礼盒`（锚 `#services` 或 `/work`）
- 背景图：使用新生成的基地航拍图（占位）
- 保留全屏布局、overlay、scroll 指示器、reveal 动画

### `src/components/Services.tsx` → 复用为「产地优势」
- 标题：`产地优势`/`从安阳湖畔，到一日三餐`
- 4 张卡片：好水源 / 好气候 / 好生态 / 好管理（用户提供的描述）
- 保留 01-04 编号 + 两列网格

### `src/components/About.tsx` → 复用为「品牌故事」
- 标题：`从安阳湖畔，到一日三餐`
- 正文：用户提供的公司介绍
- 右侧 `RESEARCH/COLLABORATION/INNOVATION` 改为「品质工艺」流程列表：油橄榄种植 → 果实成熟 → 适时采摘 → 8小时冷榨 → 品质检测 → 灌装储存 → 进入家庭餐桌
- 底部 FOUNDED/PROJECTS 改为：`成立于 2017` / `省级龙头企业 · 国家高新企业`

### `src/components/Portfolio.tsx` → 复用为「产品中心」
- 标题：`产品中心`
- 4 个产品卡片（保留大图 + hover 缩放）：
  1. 科拉蒂高端礼盒系列（500ml×2 / 1L×2，酸度≤0.5%，多酚 368.67mg/kg）
  2. 经典款礼盒系列（500ml×2 / 1L×2，酸度≤0.5%，混合品种）
  3. 科拉蒂单品种橄榄油
  4. 特级初榨橄榄油瓶装系列
- 描述展示规格 / 酸度 / 品种参数

### 新增小段（在 Portfolio 与 Contact 之间，作为现有 `Index` 内的额外 section，不改框架）
- 「礼盒定制」简短 CTA 区块（复用 Tailwind 卡片样式）
- 「产业园 / 文旅体验」横幅区块（复用现有 hero overlay 样式）
- 这两段直接写在 `pages/Index.tsx` 中，不新增组件，避免破坏组件划分

### `src/components/Contact.tsx`
- 标题：`联系我们 / 团购合作 · 礼盒定制 · 招商咨询`
- EMAIL / PHONE / STUDIO 三块替换为：
  - 公司：十堰泽盟农业开发有限公司
  - 品牌：安阳湖橄榄油
  - 电话/地址/邮箱用 `占位 · 待补充`
- FOLLOW US 改为「电商渠道」：天猫 / 京东 / 抖音 / 微信公众号（占位 #）
- 底部段落改为团购/礼盒/招商咨询说明
- 保留两栏布局

### 子页面
- `pages/Work.tsx` → 完整产品列表（沿用 Portfolio 数据）
- `pages/Services.tsx` → 产地优势 + 品质工艺详解
- `pages/About.tsx` → 公司发展史 + 龙头企业荣誉
- `pages/Contact.tsx` → 同步首页 Contact 文案
- `pages/Blog.tsx` + `data/blogPosts.ts` → 替换为 5 篇资讯：
  1. 安阳湖油橄榄基地动态
  2. 什么是特级初榨橄榄油
  3. 橄榄油适合哪些烹饪方式
  4. 安阳湖橄榄油礼盒适合哪些场景
  5. 从一颗橄榄果到一瓶橄榄油的制作过程
- `pages/BlogPost.tsx` 逻辑不变

## 图片资产

由于本轮对话**没有检测到您实际上传的图片**（Hero/产品/礼盒/基地图等），我会按以下方式处理，确保 `npm run dev` 立即可跑：

- 用 `imagegen` 生成符合品牌调性的占位图，覆盖到 `src/assets/`：
  - `hero-architecture.jpg` → 替换为「安阳湖油橄榄基地航拍」
  - `project-1/2/3.jpg` → 替换为「橄榄礼盒」「橄榄果特写」「冷榨车间」
  - 新增 `product-bottle.jpg` `olive-grove.jpg` 用于产品/产业园区
  - `blog-*.jpg` → 替换为对应资讯封面
- 占位图保持原比例与原文件名/路径，组件无需改 import
- 如您稍后补充真实素材，只需替换同名文件即可

> 如果您希望先暂停、由您手动上传真图后再开工，请告诉我，我会等待。

## 响应式与功能验证

- 所有改动只动文案/颜色/图片，复用既有 Tailwind 响应式类（`md:` `lg:`）
- 保留现有 `Toaster` `Sonner` `TooltipProvider` 等全局功能
- 不新增依赖，`npm install / npm run dev` 不受影响

## 受影响文件清单

视觉/主题：
- `src/index.css`、`tailwind.config.ts`、`index.html`（引入字体）

首页区块组件：
- `src/components/Navigation.tsx`
- `src/components/Hero.tsx`
- `src/components/Services.tsx`（→ 产地优势）
- `src/components/About.tsx`（→ 品牌故事 + 工艺流程）
- `src/components/Portfolio.tsx`（→ 产品中心）
- `src/components/Contact.tsx`（→ 联系/合作）
- `src/pages/Index.tsx`（在原结构内追加「礼盒定制」「产业园」两段，不新增组件）

子页面：
- `src/pages/Work.tsx`、`Services.tsx`、`About.tsx`、`Contact.tsx`、`Blog.tsx`
- `src/data/blogPosts.ts`

资产（生成式占位图，文件名复用）：
- `src/assets/hero-architecture.jpg`、`project-1.jpg`、`project-2.jpg`、`project-3.jpg`、`blog-*.jpg`，并新增 1-2 张产品/园区图

## 待确认

1. 真实图片素材本轮未检测到附件，是否同意我先用生成式占位图，您后续替换同名文件？
2. 是否保留「暗色模式切换」按钮（原项目自带）？
