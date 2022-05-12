import { useEffect } from "react";

const useInfityScroll = (ref, cb, endPoint) => {
  useEffect(() => {
    let observer;

    if (endPoint) {
      return observer && observer.disconnect();
    }

    const onIntersect = ([entry]) => {
      if (entry.isIntersecting) {
        cb();
      }
    };

    if (ref) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.9,
      });
      observer.observe(ref.current);
    }

    return () => observer && observer.disconnect();
  }, [cb, endPoint, ref]);
};

export default useInfityScroll;
