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

  useEffect(() => {
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
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
