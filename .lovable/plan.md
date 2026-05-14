## 调整品质工艺球体的背景

### 问题
当前 InfiniteMenu 容器写死了 `bg-background border border-border`，在深色模式下是接近纯黑的方块，与品牌故事页的 `bg-muted/40` 段落底色脱节，像一块挖空的硬边卡片。

### 方案
让球体"无缝嵌入"页面，而不是塞进盒子里。

1. **去掉硬边和方框**
   - 移除 `bg-background`、`border border-border`、`overflow-hidden rounded-sm`
   - 容器仅保留 `relative w-full h-[520px] md:h-[640px]`

2. **加一层软质舞台感的背景**
   - 在容器内放一个 `absolute inset-0 -z-0` 的装饰层，用径向渐变营造柔和聚光：
     ```
     bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.10),transparent_70%)]
     ```
   - 上下加一道极淡的水平分割线 `border-y border-border/40`（可选，看视觉再决定），让区域有起承转合但不会变成一个突兀的卡片
   - WebGL canvas 已是透明清屏（`gl.clearColor(0,0,0,0)`），所以底层渐变可以透出来

3. **品牌色在亮/暗双模式下都和谐**
   - 用 `hsl(var(--primary)/0.10)` 而不是固定颜色 → 自动跟随主题（亮模式 → 淡橄榄绿光晕；暗模式 → 暖黄绿光晕）
   - 标题/描述文字已使用 `text-foreground` / `text-muted-foreground`，无需改动

### 文件改动
- `src/components/About.tsx`：仅调整球体外层 `<div>` 的 className，约 1 处；不动数据、不动 InfiniteMenu 组件本身
