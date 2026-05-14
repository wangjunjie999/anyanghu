## 修复 4 个问题

### 1. 内容重复：产地优势 vs 品牌故事
当前重复点：
- `Services.tsx`「04 · 好管理」描述里讲了"种植、采摘、运输、冷榨到品质检测全流程"——已经是工艺流程
- `About.tsx` 右上信息卡里又出现「工艺标准 · 8 小时低温冷榨」
- 下方 CRAFTSMANSHIP 球体本身就是完整 7 步工艺

调整：
- **`About.tsx` 右上信息卡**：把「工艺标准」格替换为「核心产品 · 特级初榨橄榄油」（避免和下面球体重复）
- **`Services.tsx` 04 项**：标题保留「好管理」，描述改为聚焦"标准化追溯 + 省级龙头/国高新认证体系"，不再罗列工艺步骤；工艺细节交给品牌故事页的球体
- 这样：产地优势 = 风土与体系；品牌故事 = 企业 + 7 步工艺探索，职责分明

### 2. 暗色模式下 Hero / 产业园文字看不见
根因：`Hero.tsx` 与 `Index.tsx`「油橄榄大健康产业园」段都用 `text-background` / `text-background/85` 着色。`--background` 在暗色模式 = 深墨绿 `120 25% 8%`，覆盖在墨绿背景图上几乎不可见（用户截图正是这种状态）。

方案：这些文字永远叠在深色图片之上，应固定为浅色，不随主题翻转。
- 在 `index.css` 新增固定 token：`--hero-foreground: 40 25% 94%;`（亮/暗模式同值），并加上 Tailwind `text-hero-foreground` 工具
- 或简单方案：把 `Hero.tsx` 与「产业园」section 中的 `text-background*` 全部替换为 `text-[hsl(40_25%_94%)]` / `text-[hsl(40_25%_94%/0.85)]`
- 同步 SCROLL 指示线、按钮边框 `border-background/60` 也改成同一固定浅色

### 3. 球体区域"一块黑色突兀地粘上去"
问题：当前 `border-y border-border/40` + 一个小范围径向渐变在视觉上仍像一个独立卡片，且球体几何阴影聚集在中心让那一块显黑。

方案——做成自然融入页面的渐变舞台：
- 删掉 `border-y` 硬边
- 把容器装饰层改为**多层叠加的纵向渐变**，让上下两端无缝融入 `bg-muted/40`：
  ```
  bg-[linear-gradient(180deg,transparent_0%,hsl(var(--primary)/0.06)_30%,hsl(var(--accent)/0.10)_55%,hsl(var(--primary)/0.06)_75%,transparent_100%)]
  ```
- 叠加一个柔和径向高光：`radial-gradient(ellipse_60%_50%_at_center,hsl(var(--accent)/0.12),transparent_70%)`
- 容器高度区域用上下各 `mask-image: linear-gradient(180deg,transparent,black 12%,black 88%,transparent)` 让边界羽化
- 暗模式自动跟随（accent/primary 都是主题色）

### 4. 球体标题在浅色模式下"发绿看不清"
根因：`InfiniteMenu.tsx` 标题用 `text-foreground`（亮色 = `hsl(120 35% 12%)` 深墨绿），叠在偏绿色的农场图片上对比度差。

方案：给标题与描述加可读性兜底，不改主色调：
- 标题：保留 `text-foreground`，但加 `drop-shadow-[0_2px_8px_hsl(var(--background)/0.85)]` 与 `[text-shadow:0_1px_2px_hsl(var(--background)/0.6)]` 双重发光描边，让文字在任何图片背景下都浮起来
- 描述：同样加更轻一档的 drop-shadow
- 暗模式下 `--background` = 深绿，发光自动变成深色描边，浅色文字依然清晰
- 不需要加底板色块，保持极简观感

### 文件改动清单
- `src/components/Services.tsx` — 改 04 项 description（1 行）
- `src/components/About.tsx` — 改右上信息卡 1 格 + 球体外层 div className
- `src/components/Hero.tsx` — 文本颜色全部改为固定浅色
- `src/pages/Index.tsx` — 「产业园」section 文本颜色固定浅色
- `src/components/InfiniteMenu.tsx` — 标题/描述加 drop-shadow + text-shadow
- `src/index.css`（可选）— 新增 `--hero-foreground` token 与 Tailwind 映射

不改：球体交互逻辑、数据、动效、其他模块。
