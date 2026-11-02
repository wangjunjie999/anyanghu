import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/hooks/use-motion";

/**
 * Gentle scroll parallax background (transform only, works on iOS).
 * The image is taller than its section and drifts slower than the page.
 */
const ParallaxBg = ({ src, strength = 0.12 }: { src: string; strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    let raf = 0;
    let visible = false;
    const update = () => {
      raf = 0;
      const r = parent.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-center * strength).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) onScroll();
    });
    io.observe(parent);
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-x-0 -top-[15%] -bottom-[15%] bg-cover bg-center will-change-transform"
      style={{ backgroundImage: `url(${src})` }}
    />
  );
};

export default ParallaxBg;
