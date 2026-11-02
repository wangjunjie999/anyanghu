import { forwardRef, useMemo, useRef, useEffect, useState, MutableRefObject, CSSProperties, HTMLAttributes } from 'react';
import { motion } from 'motion/react';

/** Pausable RAF loop: only runs when active=true */
function usePausableAnimationFrame(callback: () => void, active: boolean) {
  useEffect(() => {
    if (!active) return;
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback, active]);
}

/** Tracks pointer position + whether it has moved recently. */
function usePointerActivity(
  containerRef: MutableRefObject<HTMLElement | null>,
  idleMs = 180,
  onMove?: () => void
) {
  const positionRef = useRef({ x: -9999, y: -9999 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const update = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
      setIsMoving(true);
      onMove?.();
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsMoving(false), idleMs);
    };
    const onMouseMove = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) update(t.clientX, t.clientY);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [containerRef, idleMs, onMove]);

  return { positionRef, isMoving };
}

/** Track whether the container is in viewport */
function useInView(containerRef: MutableRefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const node = containerRef?.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '100px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [containerRef]);
  return inView;
}

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const interpolatedSettingsRef = useRef<string[]>([]);

  // Detect coarse pointer (touch / no hover) — render static for perf and a sensible mobile look.
  const [isCoarse, setIsCoarse] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const update = () => setIsCoarse(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  const { positionRef, isMoving } = usePointerActivity(containerRef, 180);
  const inView = useInView(containerRef);
  const active = !isCoarse && isMoving && inView;

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr: string) =>
      new Map(
        settingsStr
          .split(',')
          .map(s => s.trim())
          .map(s => {
            const [name, value] = s.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)];
          })
      );
    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);
    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  // Static "mid weight" fallback for coarse pointers (mobile look).
  const midSettings = useMemo(
    () =>
      parsedSettings
        .map(({ axis, fromValue, toValue }) => `'${axis}' ${(fromValue + toValue) / 2}`)
        .join(', '),
    [parsedSettings]
  );

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = (distance: number) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  };

  const tick = useMemo(
    () => () => {
      if (!containerRef?.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const { x, y } = positionRef.current;
      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) return;
        const rect = letterRef.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - containerRect.left;
        const cy = rect.top + rect.height / 2 - containerRect.top;
        const distance = calculateDistance(x, y, cx, cy);
        if (distance >= radius) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings;
          return;
        }
        const f = calculateFalloff(distance);
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => `'${axis}' ${fromValue + (toValue - fromValue) * f}`)
          .join(', ');
        interpolatedSettingsRef.current[index] = newSettings;
        letterRef.style.fontVariationSettings = newSettings;
      });
    },
    [containerRef, positionRef, parsedSettings, radius, fromFontVariationSettings]
  );

  usePausableAnimationFrame(tick, active);

  // When loop pauses, reset every letter to "from" so we don't leave it stuck mid-interpolation.
  useEffect(() => {
    if (active) return;
    const target = isCoarse ? midSettings : fromFontVariationSettings;
    letterRefs.current.forEach(el => {
      if (el) el.style.fontVariationSettings = target;
    });
  }, [active, isCoarse, midSettings, fromFontVariationSettings]);

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      onClick={onClick}
      style={{
        display: 'inline',
        fontFamily: '"Roboto Flex", sans-serif',
        ...style,
      }}
      className={className}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map(letter => {
            const currentLetterIndex = letterIndex++;
            return (
              <motion.span
                key={currentLetterIndex}
                ref={el => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings:
                    interpolatedSettingsRef.current[currentLetterIndex] ??
                    (isCoarse ? midSettings : fromFontVariationSettings),
                }}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';

export default VariableProximity;
