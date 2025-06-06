import { useRef, useState, useEffect } from "react";

interface IntersectionObserverProps {
  threshold?: number;
}

const useVisibilityObserver = ({
  threshold = 0.1,
}: IntersectionObserverProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: threshold }
    );

    if (node) {
      observer.observe(node);
    }
    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [ref, threshold]);

  return { ref, isVisible };
};

export default useVisibilityObserver;
