import { RefObject, useCallback, useEffect, useState } from 'react';

export const useScrollStatus = (ref: RefObject<HTMLDivElement>) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    if (ref.current) {
      setIsScrolled(ref.current.scrollTop > 0);
    }
  }, [ref]);

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref, handleScroll]);

  return {
    isScrolled,
  };
};
