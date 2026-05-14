## 评估结论

可以用，且很适合。`GradualBlur` 是纯视觉的渐变模糊蒙层组件，无业务逻辑、无样式污染、依赖只是 React 本身（你给的 `mathjs` 实际并未在源码里用到，可以不装）。和我们米白 / 橄榄绿、简约高级感的品牌调性兼容：用在 Hero 底部、产品大图底部、产业园背景区底部，作为「内容向下渐隐」的过渡，比硬切要干净，也呼应你视频里那种「上下滚动 + 渐入渐出」的呼吸感。

配合再加一层基于 IntersectionObserver 的「滚入旋转 + 渐入」轻动画（橄榄果图标轻微旋转、产品图淡入上移），即可达到你说的「旋转 + 渐入渐出」效果，且不会花哨。

---

## 实施计划

### 1. 新增组件
- `src/components/GradualBlur.tsx`：照搬你贴的源码（TS + Tailwind 版），去掉未使用的 `mathjs`，不装新依赖。
- `src/components/Reveal.tsx`：极简包装，基于 `IntersectionObserver`，提供三种入场：
  - `fade-up`（默认，渐入 + 上移）
  - `fade-rotate`（渐入 + 轻微旋转 -6° → 0°，用于橄榄果 / 瓶身图）
  - `fade-scale`（渐入 + 0.96 → 1，用于礼盒卡片）
  
  动画时长 700–900ms，`cubic-bezier(0.16,1,0.3,1)`，只触发一次，`prefers-reduced-motion` 下禁用。

### 2. 在 `tailwind.config.ts` 增补 keyframes
新增 `fade-up`、`fade-rotate`、`fade-scale` 三个动画（已有 `fade-in-up`、`scale-in`，复用并补一个旋转版即可）。不改色板、不改字体。

### 3. 应用位置（克制使用，全站不超过 4 处模糊 + 关键区块入场动画）

| 位置 | 动画 | 目的 |
|---|---|---|
| `Hero.tsx` 底部 | `<GradualBlur position="bottom" height="8rem" strength={2} curve="bezier" />` | 大图向下文字区平滑过渡，呼应视频底部渐隐 |
| `Hero.tsx` 标题/副标题 | 已有 `.reveal`，保留 | — |
| `Services.tsx` 4 张「产地优势」卡片 | `Reveal variant="fade-up"`，`stagger` 100ms | 滚入呼吸感 |
| `About.tsx` 7 步工艺流程节点 | `Reveal variant="fade-rotate"` | 轻微旋转入场，体现「果实 → 瓶」的过程感 |
| `Portfolio.tsx` 产品图 | `Reveal variant="fade-scale"` + 卡片底部 `<GradualBlur position="bottom" height="3rem" strength={1.2} />` 仅在大图卡片上 | 产品图更精致；底部模糊让规格文字浮现更柔和 |
| `Index.tsx` 礼盒区图片 | `Reveal variant="fade-scale"` | — |
| `Index.tsx` 产业园背景区 | `<GradualBlur position="bottom" height="6rem" strength={2} animated="scroll" />` | 大背景图向下一个区块的过渡 |
| `Contact.tsx` | 不加动画 | 表单区保持冷静 |

### 4. 性能与可达性
- `GradualBlur` 只在桌面渲染全部 `divCount={5}`，移动端通过 `responsive` + `mobileHeight` 降到 `divCount={3}` 等价（直接传更小的 strength/height）。
- 所有 `Reveal` 在 `prefers-reduced-motion: reduce` 时直接 opacity:1 静态显示。
- 不改路由、不改 SEO、不动 `Helmet`。

### 5. 不做的事
- 不引入 framer-motion / GSAP（避免体积膨胀，纯 CSS + IO 足够）。
- 不安装 `mathjs`（源码未使用）。
- 不改全局色 / 字体 / 布局结构。
- 不在 Header、Footer、Form 上加动画。

---

### 改动文件清单
- 新增：`src/components/GradualBlur.tsx`、`src/components/Reveal.tsx`
- 编辑：`tailwind.config.ts`（补 1 个 keyframe）、`src/components/Hero.tsx`、`src/components/Services.tsx`、`src/components/About.tsx`、`src/components/Portfolio.tsx`、`src/components/Contact.tsx`（不动）、`src/pages/Index.tsx`

预计代码改动量小，视觉提升明显，且符合「简约不花哨」的要求。
