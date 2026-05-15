## 目标
弧形产品轮播在移动端拖动阻尼过强、跟手不灵敏。仅调整移动端（粗指针/触控）参数，桌面端鼠标体验保持不变。

## 改动文件
- `src/components/CircularGallery.tsx`

## 调整内容

1. **新增 `isCoarse` 实例字段**（构造时通过 `matchMedia('(hover: none), (pointer: coarse)')` 一次性判定），方便后续在事件处理里读取，无需每次重算。

2. **拖动跟手系数提升（onTouchMove）**
   - 当前：`distance = (start - x) * (scrollSpeed * 0.025)`
   - 移动端改为 `* 0.05`（约 2× 灵敏度），桌面端保留 `* 0.025`
   - 速度采样里的同一系数同步使用 `isCoarse ? 0.05 : 0.025`

3. **缓动更跟手（scroll.ease）**
   - 移动端在构造时把 `scrollEase` 提升下限：`ease = isCoarse ? Math.max(scrollEase, 0.085) : scrollEase`
   - 让插值更快收敛，减少"拖完之后还在缓慢漂移"的胶着感

4. **惯性投射略增强（onTouchUp）**
   - 当前：`inertia = velocity * 180`
   - 移动端改为 `velocity * 260`，桌面端保持 `180`
   - 让快速一划之后能多滑过一两个产品，符合移动手势预期

5. **轮子事件不受影响**，仅触控路径调整。

不改变：bend、阻尼物理模型、snap 对齐逻辑、暂停/恢复行为。