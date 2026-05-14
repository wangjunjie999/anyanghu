# 顶部导航集成 GooeyNav 粘液动画

## 目标
将顶部导航栏的页面切换效果替换为 React Bits 的 GooeyNav 粘液气泡动画，保留品牌色调与现有路由结构。

## 执行步骤

1. **新建 `src/components/GooeyNav.tsx`**
   - 复制官方 TypeScript 源码（包含内嵌 `<style>` 与粒子动画逻辑）
   - 修复源码末尾被截断的 JSX 部分，补全：
     ```
     <div className="relative" ref={containerRef}>
       <nav>
         <ul ref={navRef} className="flex gap-8 ...">
           {items.map(...)}
         </ul>
       </nav>
       <span className="effect filter" ref={filterRef} />
       <span className="effect text" ref={textRef} />
     </div>
     ```
   - 增加 `onNavigate` 回调或在点击时使用 `window.location.href = item.href` 完成路由跳转（项目使用 react-router，可改用 `useNavigate`）
   - 根据当前 `location.pathname` 计算 `initialActiveIndex`

2. **改造 `src/components/Navigation.tsx`**
   - 桌面端（md 及以上）：用 `<GooeyNav>` 替代当前的 `navLinks.map(...)` 链接组
   - 保留 logo、`ThemeToggle`、移动端汉堡菜单不变
   - GooeyNav 容器使用 `relative` 定位以承载粒子绝对定位层
   - 颜色适配：将 CSS 变量 `--color-1..4` 在容器内联样式中映射为品牌色（primary、accent 等 HSL token），让粒子与暖色品牌色协调而非默认彩虹色
   - active 态文字色：源码默认黑底白字 + 激活变黑。需要调整为：未激活=`muted-foreground`，激活=`primary-foreground`（白底），气泡背景=`primary`

3. **样式与品牌一致性**
   - `effect.filter::before` 的黑色背景改为 `transparent`（避免顶栏出现黑块），保留高对比滤镜效果
   - `li::after` 与 `effect.filter::after` 的白色高亮改为 `hsl(var(--primary))`
   - `li.active` 文字色改为 `hsl(var(--primary-foreground))`
   - 字体沿用 `tracking-wide text-sm`，与现有导航视觉重量一致

4. **移动端**
   - 不引入 GooeyNav（粒子在小屏拥挤），继续使用现有汉堡菜单

## 技术细节
- 路由跳转：使用 `react-router-dom` 的 `useNavigate`，在 `handleClick` 内部 `e.preventDefault()` 后调用 `navigate(href)`，保持 SPA 行为
- 首页 `/` 不在 navLinks 中，因此当 `pathname === "/"` 时 `initialActiveIndex` 设为 -1（不高亮任何项）
- 内嵌 `<style>` 仅在组件挂载时注入一次

## 文件改动
- 新增 `src/components/GooeyNav.tsx`
- 编辑 `src/components/Navigation.tsx`