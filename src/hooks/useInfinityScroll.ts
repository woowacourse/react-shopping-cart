import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";

interface InfinityScrollProps {
  ref: RefObject<HTMLElement>;
  cb: () => {};
  endPoint: boolean;
}

const useInfinityScroll = ({
  ref,
  cb,
  endPoint = true,
}: InfinityScrollProps) => {
  const observer = useRef(undefined) as MutableRefObject<any>;
  const callBack = useRef(cb);

  const onIntersect = useCallback(
    ([entry]: any[]) => {
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
