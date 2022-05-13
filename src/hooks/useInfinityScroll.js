import { useCallback, useEffect, useRef } from "react";

const useInfinityScroll = (ref, cb, endPoint) => {
  const observer = useRef(null);

  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        cb();
      }
    },
    [cb]
  );

  useEffect(() => {
    if (endPoint) {
      return observer.current && observer.current.disconnect();
    }

    if (ref.current) {
      observer.current = new IntersectionObserver(onIntersect, {
        threshold: 0.9,
      });
      observer.current.observe(ref.current);
    }

    return () => observer.current && observer.current.disconnect();
  }, [endPoint, onIntersect, ref]);
};

export default useInfinityScroll;
