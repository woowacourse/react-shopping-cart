import { useEffect, useRef } from 'react';

const useBodyScrollLock = (isLocked: boolean) => {
  const scrollPosition = useRef<number>(0);

  useEffect(() => {
    if (isLocked) {
      scrollPosition.current = window.pageYOffset;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('width');

      window.scrollTo(0, scrollPosition.current);
    }

    return () => {
      if (isLocked) {
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('position');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('width');
        window.scrollTo(0, scrollPosition.current);
      }
    };
  }, [isLocked]);
};

export default useBodyScrollLock;
