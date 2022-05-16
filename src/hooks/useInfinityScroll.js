import { useCallback, useEffect, useRef } from "react";

const useInfinityScroll = ({ ref = null, cb, endPoint = false }) => {
  const observer = useRef(undefined);
  const callBack = useRef(cb);

  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        callBack.current();
      }
    },
    [callBack]
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

    return function () {
      observer.current && observer.current?.disconnect();
    };
  }, [endPoint, onIntersect, ref]);
};

export default useInfinityScroll;
