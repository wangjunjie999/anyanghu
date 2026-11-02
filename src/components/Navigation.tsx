import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import GooeyNav from "@/components/GooeyNav";

const navLinks = [
  { href: "/work", label: "产品中心" },
  { href: "/services", label: "产地优势" },
  { href: "/about", label: "品牌故事" },
  { href: "/blog", label: "资讯" },
  { href: "/contact", label: "联系我们" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const activeIndex = navLinks.findIndex((l) => location.pathname.startsWith(l.href));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-serif text-lg tracking-wider text-foreground">
          安阳湖橄榄油
        </a>

        <div className="hidden md:flex items-center">
          <GooeyNav
            key={activeIndex}
            items={navLinks}
            initialActiveIndex={activeIndex}
            particleCount={14}
            animationTime={600}
          />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          aria-label={isMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-6 py-6 space-y-4">
            <GooeyNav
              key={`mobile-${activeIndex}`}
              items={navLinks}
              initialActiveIndex={activeIndex}
              particleCount={12}
              animationTime={600}
              vertical
              onItemClick={() => setIsMenuOpen(false)}
            />
            <div className="pt-4 border-t border-border">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
