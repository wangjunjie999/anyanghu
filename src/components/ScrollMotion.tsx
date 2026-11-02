import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 全站滚动联动动效（参考苹果官网）：每个板块的内容随滚动进度连续进场、离场，往回滚即倒放。
 * 只写 transform / opacity，不改任何板块的结构和样式；板块背景保持铺满不动。
 * 开启系统「减少动态效果」时不生效。
 */

type Scene = {
  section: HTMLElement;
  content: HTMLElement[]; // 普通流内的内容：进场 / 离场
  media: HTMLElement[]; // 首屏的绝对定位背景：视差放大
  hero: boolean;
  bgImage: boolean;
};

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const isLayer = (el: HTMLElement) => {
  const pos = getComputedStyle(el).position;
  return pos === "absolute" || pos === "fixed" || pos === "sticky";
};

const collectScenes = (): Scene[] => {
  // 含 WebGL 画布的板块（品质工艺球体、产品弧形轮播）保持原有模块效果，不参与滚动联动
  const sections = Array.from(document.querySelectorAll<HTMLElement>("#root section")).filter(
    (s) => !s.parentElement?.closest("section") && s.offsetHeight > 0 && !s.querySelector("canvas")
  );
  return sections.map((section, i) => {
    const children = Array.from(section.children) as HTMLElement[];
    const content = children.filter((el) => !isLayer(el));
    const media = children.filter((el) => isLayer(el) && (el.tagName === "IMG" || el.querySelector(":scope > img")));
    return {
      section,
      content,
      media,
      hero: i === 0 && section.getBoundingClientRect().top + window.scrollY < 120 && media.length > 0,
      bgImage: !!section.style.backgroundImage,
    };
  });
};

const resetScene = (scene: Scene) => {
  [...scene.content, ...scene.media].forEach((el) => {
    el.style.transform = "";
    el.style.opacity = "";
    el.style.transformOrigin = "";
  });
  if (scene.bgImage) scene.section.style.backgroundPosition = "";
};

const renderScenes = (scenes: Scene[]) => {
  const vh = window.innerHeight;
  const mobile = window.innerWidth < 768;
  const rects = scenes.map((s) => s.section.getBoundingClientRect());

  scenes.forEach((scene, i) => {
    const r = rects[i];
    if (r.bottom < -vh || r.top > vh * 2) return;

    // 首屏：背景缓慢放大下沉，文字上移并淡出
    if (scene.hero) {
      const p = clamp(-r.top / Math.max(r.height, 1));
      scene.media.forEach((el) => {
        el.style.transform = `translate3d(0, ${(p * r.height * 0.3).toFixed(1)}px, 0) scale(${(1 + p * 0.12).toFixed(4)})`;
      });
      scene.content.forEach((el) => {
        el.style.transform = `translate3d(0, ${(-p * (mobile ? 80 : 140)).toFixed(1)}px, 0) scale(${(1 - p * 0.06).toFixed(4)})`;
        el.style.opacity = clamp(1 - p * 1.6).toFixed(3);
      });
      return;
    }

    // 其余板块：从视口底部升起、放大、变清晰；离开顶部时轻微缩小、变淡
    const dist = mobile ? 40 : 80;
    const minScale = mobile ? 0.97 : 0.94;
    const enter = easeOut(clamp((vh - r.top) / (vh * 0.65)));
    const exit = clamp((vh * 0.4 - r.bottom) / (vh * 0.4));
    const y = (1 - enter) * dist - exit * dist * 0.5;
    const scale = minScale + (1 - minScale) * enter - (1 - minScale) * 0.6 * exit;
    const opacity = (0.25 + 0.75 * enter) * (1 - 0.6 * exit);
    const origin = exit > 0 ? "50% 100%" : "50% 0%";
    scene.content.forEach((el) => {
      el.style.transformOrigin = origin;
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
      el.style.opacity = opacity.toFixed(3);
    });

    // 带背景图的板块：背景随滚动缓慢错位，形成纵深
    if (scene.bgImage) {
      const offset = (r.top + r.height / 2 - vh / 2) * -0.15;
      scene.section.style.backgroundPosition = `center calc(50% + ${offset.toFixed(1)}px)`;
    }
  });
};

const ScrollMotion = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scenes: Scene[] = [];
    let frame = 0;
    let collectTimer = 0;

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (scenes.some((s) => !s.section.isConnected)) scenes = collectScenes();
        renderScenes(scenes);
      });
    };

    const collect = () => {
      const next = reducedQuery.matches ? [] : collectScenes();
      // 只清理已不再参与的板块，避免重新收集时闪一帧
      scenes.filter((s) => !next.some((n) => n.section === s.section)).forEach(resetScene);
      scenes = next;
      schedule();
    };

    // 页面内容是异步渲染的，结构变化后重新收集板块
    const observer = new MutationObserver(() => {
      window.clearTimeout(collectTimer);
      collectTimer = window.setTimeout(collect, 150);
    });
    const root = document.getElementById("root");
    if (root) observer.observe(root, { childList: true, subtree: true });

    collectTimer = window.setTimeout(collect, 50);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", collect);
    reducedQuery.addEventListener("change", collect);

    return () => {
      observer.disconnect();
      window.clearTimeout(collectTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", collect);
      reducedQuery.removeEventListener("change", collect);
      scenes.forEach(resetScene);
    };
  }, [pathname]);

  return null;
};

export default ScrollMotion;
