## 评估

三个诉求都可以做，且互相独立、不会破坏现有布局：

1. **回滚收回动画**：现在 `Reveal.tsx` 是「触发一次就停」（once-only IntersectionObserver）。改成双向：进入视口播入场动画，离开视口反向收回。属于 `Reveal` 内部改造，所有调用点零修改。
2. **倒油动画（产品出现时）**：在 `Portfolio.tsx` 每张产品图卡片上叠一层 SVG/CSS 的「金色油液从瓶口流下、注入、形成油面」过场。只在卡片首次进入视口时播放一次（避免反复打扰），动画结束后元素 `display:none` 不影响交互。纯 CSS + SVG `clip-path` + 渐变，不引第三方库。
3. **CircularGallery 产品横向弧形轮播**：用作产品中心的「精选产品横向展示」入口区，作为现有 4 张产品卡片网格之上的一个 hero 级展示带（不替换原有网格，原网格保留作为详细规格区）。需要装 `ogl` 依赖。

---

## 实施计划

### 1. 改造 `src/components/Reveal.tsx` —— 支持双向

- 新增 prop：`bidirectional?: boolean`（默认 `true`，符合用户「回滚也有收回」的要求）。
- IntersectionObserver 不再 `unobserve`，监听 `isIntersecting`：true → 加 `is-visible`，false → 移除。
- 保持 `prefers-reduced-motion` 下静态显示。
- 动画时长 / 缓动不变（700–900ms，`cubic-bezier(0.16,1,0.3,1)`），所以反向收回也是同一条曲线，观感对称。
- 调用点 0 修改（Hero / Services / About / Portfolio / Index 全部沿用）。

### 2. 新增 `src/components/PourOilReveal.tsx` —— 倒油过场

包装单张产品图，结构：

```text
<div class="relative">
  <img ... />                 // 原产品图，初始 opacity:0
  <PourOverlay />             // 绝对定位覆盖层
</div>
```

`PourOverlay` 由三层组成（纯 CSS + SVG）：

- **油柱**：一根 6px 宽的金橄榄色（`hsl(45 70% 55%)` → `hsl(38 60% 45%)` 渐变）竖向 SVG path，从顶部 `scaleY:0` 向下 `scaleY:1` 拉伸（0–500ms）。
- **油面上涨**：底部一块带 `clip-path: polygon(...)` 的金色半透明矩形，`top` 从 100% → 0%（500–1400ms），表面用 `border-radius` + 轻微 `wave` keyframe 模拟液面波动。
- **产品图浮现**：油面到达顶部后（1200–1600ms）产品图 `opacity 0 → 1`，油层 `opacity → 0` 淡出。

控制：用 `IntersectionObserver` 触发一次，加一个 `data-played` 标记，避免双向滚动反复播。`prefers-reduced-motion` 下直接 `opacity:1` 跳过整个过场。

应用位置：`Portfolio.tsx` 4 张产品卡片，把现有 `<Reveal variant="fade-scale">` 内的 `<img>` 换成 `<PourOilReveal src={...} alt={...} />`。底部 `GradualBlur` 保留。

### 3. 集成 `CircularGallery`

- 新增 `src/components/CircularGallery.tsx`：照搬用户给的源码，TS + Tailwind 版本，依赖 `ogl`。
- 安装：`bun add ogl`（不装 `mathjs`，源码未使用）。
- 在 `Portfolio.tsx` 的标题区下方、产品网格上方插入一个全宽展示带：

```tsx
<div className="h-[600px] relative mb-24 -mx-6">
  <CircularGallery
    items={[
      { image: gift1, text: '科拉蒂高端礼盒' },
      { image: olives, text: '经典款礼盒' },
      { image: workshop, text: '科拉蒂单品种' },
      { image: gift1, text: '日常瓶装' },
      // 复用现有素材，4–6 项即可
    ]}
    bend={3}
    textColor="hsl(38 25% 25%)"   // 用品牌橄榄棕，不用纯白
    borderRadius={0.05}
    scrollEase={0.02}
    font="500 22px 'Noto Serif SC', serif"
  />
</div>
```

- 用品牌色字体（橄榄棕），不用默认白；让它和米白背景协调。
- `Work.tsx`（`/work` 路由）也复用同一个 `CircularGallery`，作为页面顶部 hero 下的产品轮播。

### 4. 性能与可达性

- `CircularGallery` 全局监听 `wheel` 会拦截滚动手感，给容器加上一个 `pointer-events` 隔离方案 —— 监听只在 hover 容器内时才 preventDefault；或者保留默认行为（库本身不 preventDefault，只读取 deltaY，OK）。先不改，观察。
- 移动端：CircularGallery 高度从 600px 降到 380px（`h-[380px] md:h-[600px]`）。
- `PourOilReveal` 在移动端缩短动画时长到 900ms，避免长时间挡住产品图。
- `prefers-reduced-motion: reduce` 下：双向 Reveal、倒油过场全部禁用；CircularGallery 仍可手动拖拽，但取消自动惯性动画（保持基础静态显示）。

### 5. 不做的事

- 不引 framer-motion / GSAP。
- 不改色板 / 字体 / 路由 / SEO。
- 不替换现有产品网格，CircularGallery 是补充展示带。
- 不改 Header / Footer / Form。

---

## 改动文件清单

- 新增：`src/components/PourOilReveal.tsx`、`src/components/CircularGallery.tsx`
- 编辑：`src/components/Reveal.tsx`（双向）、`src/components/Portfolio.tsx`（接入 CircularGallery + PourOilReveal）、`src/pages/Work.tsx`（顶部加 CircularGallery）、`package.json`（加 `ogl`）

预计工作量：中等。视觉冲击点集中在「产品区」，符合「凸显产品特色」诉求；其余区块只是滚动收回更顺滑，不打扰阅读。
