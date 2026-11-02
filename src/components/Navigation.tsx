import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/work", label: "产品中心" },
  { href: "/services", label: "产地优势" },
  { href: "/about", label: "品牌故事" },
  { href: "/blog", label: "资讯" },
  { href: "/contact", label: "联系我们" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const activeIndex = navLinks.findIndex((l) => location.pathname.startsWith(l.href));
  const isHome = location.pathname === "/";
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const el = activeIndex >= 0 ? linkRefs.current[activeIndex] : null;
      setIndicator(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  useEffect(() => setIsMenuOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const solid = scrolled || isMenuOpen;
  const onImage = isHome && !solid;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        solid ? "bg-background/80 backdrop-blur-md border-border" : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className={cn("font-serif text-lg tracking-wider transition-colors duration-500", onImage ? "text-[hsl(40_25%_94%)]" : "text-foreground")}
        >
          安阳湖橄榄油
        </Link>

        <div className="hidden md:flex items-center relative">
          <ul className="flex items-center gap-8">
            {navLinks.map((l, i) => (
              <li key={l.href}>
                <Link
                  ref={(el) => (linkRefs.current[i] = el)}
                  to={l.href}
                  aria-current={i === activeIndex ? "page" : undefined}
                  className={cn(
                    "relative block py-2 text-sm tracking-widest transition-colors duration-300",
                    "after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:opacity-50 after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100",
                    onImage
                      ? i === activeIndex ? "text-[hsl(40_25%_94%)]" : "text-[hsl(40_25%_94%/0.75)] hover:text-[hsl(40_25%_94%)]"
                      : i === activeIndex ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* 当前页指示线：仅用 transform 平滑滑动 */}
          <span
            aria-hidden
            className={cn(
              "absolute bottom-0 left-0 h-px w-px origin-left transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              onImage ? "bg-[hsl(40_25%_94%)]" : "bg-primary",
              indicator ? "opacity-100" : "opacity-0"
            )}
            style={{ transform: indicator ? `translateX(${indicator.x}px) scaleX(${indicator.w})` : undefined }}
          />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
        </div>

        <Button
          variant="ghost"
          size="sm"
          className={cn("md:hidden", onImage && "text-[hsl(40_25%_94%)] hover:text-foreground")}
          aria-label={isMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </Button>
      </div>

      {/* 手机菜单：StaggeredMenu 风格，菜单项依次错落滑入 */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[61px] bottom-0 bg-background border-t border-border overflow-y-auto">
          <ul className="container mx-auto px-6 pt-10 pb-8 space-y-2">
            {navLinks.map((l, i) => (
              <li key={l.href} className="overflow-hidden">
                <Link
                  to={l.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={i === activeIndex ? "page" : undefined}
                  className={cn(
                    "enter-up flex items-baseline gap-4 py-3 font-serif text-3xl font-light",
                    i === activeIndex ? "text-primary" : "text-foreground"
                  )}
                  style={{ animationDelay: `${80 + i * 70}ms` }}
                >
                  <span className="text-minimal text-muted-foreground text-xs">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="container mx-auto px-6 pt-4 border-t border-border enter-up" style={{ animationDelay: "480ms" }}>
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
