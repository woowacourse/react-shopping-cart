import { useEffect, useRef } from "react";

const useInfinityScroll = (ref, cb, endPoint) => {
  const observer = useRef(
    new IntersectionObserver(onIntersect, {
      threshold: 0.9,
    })
  ).current;

  function onIntersect([entry]) {
    if (entry.isIntersecting) {
      cb();
    }
  }

  useEffect(() => {
    if (endPoint) {
      return observer && observer.disconnect();
    }

    if (ref) {
      observer.observe(ref.current);
    }

    return () => observer && observer.disconnect();
  }, [cb, endPoint, observer, ref]);
};

export default useInfinityScroll;
