## 三处修改

### 1. 删除倒油动画
- 删除文件：`src/components/PourOilReveal.tsx`
- 修改 `src/components/Portfolio.tsx`：移除 `import PourOilReveal`，把 `<PourOilReveal>` 还原为原来的 `<img>`（保留 hover 缩放、`overflow-hidden`、`GradualBlur`）。

### 2. 修复 Hero 标题中文换行
当前标题 `安阳湖橄榄油 — 湖北十堰特级初榨橄榄油` 在 `max-w-4xl` 容器里被浏览器拆成「湖北十堰特级初榨橄榄」+「油」这种把词组拆断的难看断行。

方案：把标题拆成两行结构，每行一个完整词组，并对各行加 `whitespace-nowrap` 避免再被拆开；同时整体改为 `inline-block` 居中，用换行而不是自动 wrap。

```tsx
<h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-background text-architectural mb-8 reveal leading-tight">
  <span className="block whitespace-nowrap">安阳湖橄榄油</span>
  <span className="block whitespace-nowrap text-4xl md:text-5xl lg:text-6xl mt-3 text-background/90">
    湖北十堰 · 特级初榨橄榄油
  </span>
</h1>
```

副标题段落同样把硬换行去掉，改用 CSS `text-balance` 让中文自然排版（断在标点处）。

容器从 `max-w-4xl` 调到 `max-w-5xl`，给主标题留更宽的空间，避免大屏强行省略。

### 3. 「查看礼盒」按钮跳转改为公司详情页
`src/components/Hero.tsx`：把 `<a href="#gift">查看礼盒</a>` 改为 `<a href="/about">了解品牌</a>`（按钮文字与目的地一致）。

如果你希望文字仍叫「查看礼盒」但跳到 `/about`，告诉我即可，默认按"了解品牌"更贴合 about 页。

---

## 改动文件清单
- 删除：`src/components/PourOilReveal.tsx`
- 编辑：`src/components/Portfolio.tsx`、`src/components/Hero.tsx`
