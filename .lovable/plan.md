## 问题定位

截图所在路由是 `/work`，对应文件是 `src/pages/Work.tsx`，**不是**之前修过的 `src/components/Portfolio.tsx`。Work.tsx 第 98 行仍写死：

```tsx
textColor="hsl(38 25% 22%)"   // 深墨绿，浅色模式合适，深色模式下几乎看不见
```

## 全站排查结果

对所有源码扫了 `text-foreground / text-[hsl…] / 写死 hsl()` 的写法，结论：

| 位置 | 状态 |
|---|---|
| `src/pages/Work.tsx:98` CircularGallery textColor | ❌ 写死深色，需修 |
| `src/components/Portfolio.tsx` CircularGallery | ✅ 已主题自适应 |
| `src/components/Hero.tsx` 写死 `hsl(40 25% 94%)` 系列 | ✅ 故意：浮在深色 Hero 图上 |
| `src/pages/Index.tsx` 同上 | ✅ 同上 |
| `Services / About / Contact / Blog / BlogPost / Navigation` 等 | ✅ 全部走 `text-foreground` 等 token，自动跟随主题 |
| shadcn UI 组件 | ✅ 全 token 化 |

只剩 Work.tsx 这一处需要修。

## 修改方案

`src/pages/Work.tsx`:

1. 引入 `useEffect / useState` 与 `useTheme`，复用 Portfolio.tsx 里相同的"监听 `<html>` class 切换"逻辑得到 `isDark`。
2. 计算 `galleryTextColor = isDark ? "hsl(40 30% 95%)" : "hsl(38 25% 22%)"`。
3. 把 `<CircularGallery textColor="hsl(38 25% 22%)" …>` 改成 `textColor={galleryTextColor}`。

不改其他文件、不改布局、不改文案。

## 文件改动

- `src/pages/Work.tsx` — 1 处 import + 1 段主题监听 hook + 1 处 prop 替换
