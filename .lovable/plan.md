## 适配 ScrollFloat 的位置

ScrollFloat 适合**滚动进入视口的大号标题**（中文/英文皆可，单行短文案）。逐字弹入效果在长段落、按钮、导航上反而干扰阅读，所以只用在每个 section 的主标题。

入选位置（共 5 处主标题）：

| 页面 / 组件 | 标题 |
|---|---|
| `src/components/Services.tsx` | 产地优势 |
| `src/components/Portfolio.tsx` | 产品中心 |
| `src/components/About.tsx` | 品牌故事 |
| `src/components/Contact.tsx` | 联系我们 |
| `src/pages/About.tsx` | 荣誉与资质 |

**不动**的位置及原因：
- Hero 主标题"油橄榄大健康产业园" — 已有自定义入场动画，再叠加会冲突
- 段落正文 / 卡片小标题 / 流程步骤标题 — 文字多、字号小，逐字动画显累赘
- 导航、按钮、表单 label — 不应有装饰性动画
- shadcn UI 内部组件 — 保持原生

## 实施步骤

1. **安装依赖**：`bun add gsap`
2. **新建组件** `src/components/ScrollFloat.tsx`，使用用户提供的源代码（TS + Tailwind 版本）。组件根元素是 `<h2>`，但视觉样式由 `textClassName` 控制。
3. **替换上述 5 处 `<h3>`** 为 `<ScrollFloat>` 包裹，原有 className 通过 `textClassName` 透传，保留字体/字号/颜色/`text-architectural` 等所有现有样式。例如：
   ```tsx
   <ScrollFloat
     containerClassName="my-0"
     textClassName="font-serif text-4xl md:text-6xl font-light text-architectural text-foreground"
     stagger={0.04}
     scrollStart="top bottom-=10%"
     scrollEnd="bottom center"
   >
     产地优势
   </ScrollFloat>
   ```
4. **参数微调**：把默认 `my-5` 用 `containerClassName="my-0"` 覆盖，避免破坏原有 margin；`stagger` 调到 0.04，触发位置改为更早可见即可（默认值在中文短标题上几乎触发不到）。

## 不变更内容

- 所有正文、卡片、列表、按钮、SEO meta、路由、数据
- 暗色 / 浅色主题逻辑
- 之前修复过的 CircularGallery、InfiniteMenu 颜色

## 文件改动清单

- 新增 `src/components/ScrollFloat.tsx`
- 修改 `src/components/Services.tsx`（1 处标题）
- 修改 `src/components/Portfolio.tsx`（1 处标题）
- 修改 `src/components/About.tsx`（1 处标题）
- 修改 `src/components/Contact.tsx`（1 处标题）
- 修改 `src/pages/About.tsx`（"荣誉与资质" 1 处标题）
- `package.json` 新增 `gsap` 依赖
