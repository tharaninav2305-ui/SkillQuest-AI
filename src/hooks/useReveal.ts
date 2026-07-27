import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Reveal an element when it scrolls into view.
 * Returns a ref to attach and a boolean for whether it's in view.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  // Stable reference so the effect doesn't re-run on every render.
  const optsKey = JSON.stringify(options);
  const opts = useMemo(() => options, [optsKey]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px', ...opts }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [opts]);

  return { ref, inView };
}

/**
 * Animated number counter that runs when it scrolls into view.
 */
export function useCounter(target: number, duration = 1800) {
  const { ref, inView } = useReveal<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return { ref, value };
}
