# 动效性能与体验优化方案

## 1. VariableProximity：闲置时暂停 RAF（核心性能修复）

当前问题：组件在 `useAnimationFrame` 中**每帧 60 次**遍历所有字母调用 `getBoundingClientRect`，无论鼠标是否移动。Hero 区两段标题共约 16 个字母，长期占用主线程，是首页加载与滚动卡顿的重要嫌疑。

修改 `src/components/VariableProximity.tsx`：

- 改写 `useMousePositionRef`：在 `mousemove`/`touchmove` 中将 `isMoving` 标记为 true，并设定 150ms idle 定时器；超时则置 false。
- 改写 `useAnimationFrame`：仅当 `isMoving=true` 时调用 callback。停止移动后再追加一帧把所有字母 reset 回 `fromFontVariationSettings`，然后 `cancelAnimationFrame`。重新移动时再 `requestAnimationFrame` 启动。
- 用 `IntersectionObserver` 在 Hero 离开视口时一并暂停（路由切走/滚到下方都不再耗 CPU）。

## 2. 移动端策略：触摸有限呈现 + 自动降级

桌面端鼠标悬停是核心体验，移动端没有 hover。方案：

- 触屏（`(pointer: coarse)` 或 `ontouchstart`）下，VariableProximity 不挂载动画循环，直接用 `toFontVariationSettings` 的中间权重静态渲染，标题更厚重有质感但零运行时开销。
- 或保留触摸交互：用户手指划过标题时才触发（已有 `touchmove` 监听），但仅在标题容器内监听而非 `window`，并在 `touchend` 后 200ms 自动归位。
- 推荐方案 A（静态权重），更省电、滚动更顺。如需互动改用方案 B。

## 3. ScrollFloat 滚动空间与节奏

当前问题：`scrollStart="top bottom-=10%"` 偏迟，且容器无 padding；title 紧贴下文 `<p>`，动画几乎没"展开空间"，看起来像一闪而过。

调整 `src/components/Portfolio.tsx`、`src/components/Services.tsx`、`src/pages/About.tsx`：

- ScrollFloat 容器加 `containerClassName="my-0 py-4 md:py-6"`，给字符 `yPercent: 120` 起点留出垂直余量。
- 标题与下文段落间距由 `mt-6` 增至 `mt-10 md:mt-12`。
- 在 `<ScrollFloat>` 上方副标 (`PRODUCTS` / `PRODUCING REGION` / `HONORS`) `mb-4` 改 `mb-6`。
- 触发点提前、行程拉长，节奏更舒展：`scrollStart="top bottom-=5%"`、`scrollEnd="bottom center+=10%"`、`stagger={0.05}`、`animationDuration={1.2}`。
- 给 ScrollFloat 外层 section（`py-32`）保持不变，但首屏下的第一个 ScrollFloat 加 `mt-8` 防止刚进视口立即触发。

## 4. 全站动效性能审计与优化

候选问题点（按优先级排查并改）：

1. **CircularGallery（OGL/WebGL）** — Portfolio 中 380–560px 高度的 WebGL canvas 持续渲染，是移动端最大耗电源。改为：用 `IntersectionObserver` 包装，离开视口暂停 `requestAnimationFrame`；触屏下降低 DPR (`Math.min(devicePixelRatio, 1.5)`)。
2. **GradualBlur** — 多处使用 `divCount=4~6` 叠加 `backdrop-filter: blur`，移动端非常昂贵。Hero/产业园保留，列表内 `<GradualBlur ... divCount={4}>` 减为 `divCount={2}` 或仅在 `md:` 以上渲染。
3. **InfiniteMenu / GooeyNav**（若实际未用）— 检查 import 引用，未使用就移除以减小 bundle。
4. **Reveal 组件** — 确认使用 `IntersectionObserver` 而非 scroll 监听；若用 scroll 监听需改为 IO。
5. **图片** — 首屏 hero 已 `fetchPriority="high"`，其余都是 `loading="lazy"`，OK。补充 `decoding="async"` 与显式 `width/height` 防 CLS。
6. **字体** — `index.html` 加载 Noto Serif SC `wght@200..900`（可变字体范围大，体积可能 200KB+）。如只用 300/500/700，建议改回离散权重以减小首屏字体下载。

完成后用浏览器 performance profile 复测：关注 LCP、INP、Long Tasks、JS heap，给出"修复前/后"对比。

## 5. 验证步骤

- 启动 preview，使用 `browser--performance_profile` 收集首页指标。
- 用 `browser--start_profiling` → 滚动首页 → `browser--stop_profiling`，确认 `useAnimationFrame` 的 self-time 大幅下降。
- 在 mobile viewport (390×844) 下复测，确认 CircularGallery、blur 不再吃满帧。

## 技术细节摘要

- RAF 暂停：用 `useRef<boolean>` 存 `isAnimating`，`setTimeout` 标记 idle；恢复时 `requestAnimationFrame` 重启。
- 媒体查询：`window.matchMedia('(pointer: coarse)').matches` 判断触屏。
- IntersectionObserver：`{ rootMargin: '100px', threshold: 0 }`，离开视口设 `disabled=true`。

文件改动清单：
- `src/components/VariableProximity.tsx`（重写动画循环）
- `src/components/CircularGallery.tsx`（视口暂停 + DPR 限制）
- `src/components/Portfolio.tsx` / `Services.tsx` / `pages/About.tsx`（ScrollFloat 间距与触发参数）
- `src/components/GradualBlur.tsx` 调用处（降低 divCount）
- `index.html`（字体权重范围视使用情况收窄）
