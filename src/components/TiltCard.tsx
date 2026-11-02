import { ReactNode, useRef, PointerEvent } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/hooks/use-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees */
  maxTilt?: number;
}

/**
 * Subtle React Bits TiltedCard-style hover: lift + small tilt, mouse devices only.
 * Touch / reduced-motion users get a static card.
 */
const TiltCard = ({ children, className, maxTilt = 4 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) translateY(-6px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("group transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform", className)}
    >
      {children}
    </div>
  );
};

export default TiltCard;
