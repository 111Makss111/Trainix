"use client";

import { useEffect, useRef, useState } from "react";

type UseRepeatedRevealOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useRepeatedReveal<T extends HTMLElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -12% 0px",
}: UseRepeatedRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );

    const syncAnimationMode = () => {
      const canAnimate = mediaQuery.matches;

      setShouldAnimate(canAnimate);
      setIsVisible((currentValue) => (canAnimate ? currentValue : true));
    };

    syncAnimationMode();
    mediaQuery.addEventListener("change", syncAnimationMode);

    return () => {
      mediaQuery.removeEventListener("change", syncAnimationMode);
    };
  }, []);

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, rootMargin, shouldAnimate]);

  return { ref, isVisible };
}
