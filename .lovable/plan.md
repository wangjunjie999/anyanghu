## 问题诊断

从最新截图看，球体区域仍然是一整块纯黑色——之前做的渐变舞台、羽化遮罩、文字描边全部"被盖住了"，根因不是样式问题，而是 WebGL canvas 自身就是不透明黑底。

### 根因
`src/components/InfiniteMenu.tsx` 第 759–761 行：
```ts
const gl = this.canvas.getContext('webgl2', {
  alpha: false,      // ← 关键：canvas 强制不透明
});
```
当 `alpha: false` 时，浏览器会忽略 `gl.clearColor(0,0,0,0)`，把整个 canvas 渲染成不透明黑色。所以：
- 容器底下的 `linear-gradient` / `radial-gradient` 完全被遮住
- `mask-image` 羽化的是黑块本身，所以四角能看到下层渐变（截图里左上、右上、左下、右下露出的小弧形就是被遮罩切出的边缘）
- 文字 drop-shadow 在纯黑底上几乎不发光

### 连带问题
1. 标题 "油橄榄种植" 在黑底上偏暗绿（`text-foreground` = 深墨绿），对比度差
2. 描述文字在右下黑底上同样难辨识
3. 整个块视觉上仍像"贴上去的盒子"

## 解决方案

### 1. 让 WebGL canvas 真正透明（核心修复，1 行）
`InfiniteMenu.tsx` 第 759–762 行：
```ts
const gl = this.canvas.getContext('webgl2', {
  antialias: true,
  alpha: true,                 // 改 false → true
  premultipliedAlpha: false,   // 新增，避免半透明边缘出现深色描边
});
```
同时确认 `gl.clearColor(0,0,0,0)` 之前调用 `gl.enable(gl.BLEND)` + `gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)`（如已存在则保持）。

修复后效果：
- 球体之外区域完全透明，露出我们做的纵向 + 径向双层渐变
- 上下边缘被 `mask-image` 自然羽化进 `bg-muted/40` 段落
- 浅色模式 = 米白底上柔和的橄榄绿/浅金光晕；暗色模式 = 深墨绿底上同色光晕
- 不再像"贴上去的黑盒子"

### 2. 调强浅色模式下文字对比度（顺手优化）
canvas 透明后，标题/描述会落在偏浅色的渐变背景上，原本用 `text-foreground`（深墨绿）已经足够清晰；为防止恰好压在球体亮色图片上时仍偏淡，把已加的 drop-shadow 稍微调整：
- 标题 shadow 颜色由 `hsl(var(--background)/0.9)` 改为更稳的 `hsl(var(--background)/0.75)` + 更小模糊半径，避免在浅底上出现明显光晕
- 描述同步微调

### 3. 快速验证
切到 `/about`，检查：
- 球体周围背景与页面底色无缝过渡，没有矩形黑块
- 浅色 / 暗色双模式下标题与描述都能清晰阅读
- 球体本身贴图、旋转动画正常

## 文件改动
- `src/components/InfiniteMenu.tsx` — 改 1 处 context 选项 + 微调 2 处文字 shadow 强度

不动数据、不动布局、不动其他组件。
