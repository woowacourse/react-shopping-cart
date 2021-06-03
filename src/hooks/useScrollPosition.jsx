import { useEffect, useRef } from 'react';
import useLocalStorage from './useLocalStorage';
import { debounce } from '../utils/debounce';

const useScrollPosition = (path) => {
  const [scrollY, setScrollY] = useLocalStorage('scrollY', { [path]: 0 });
  const scrollRef = useRef(scrollY);

  useEffect(() => {
    window.scrollTo({ top: scrollY[path], left: 0, behavior: 'smooth' });

    const handleScroll = debounce(() => {
      if (window.location.pathname !== path) return;

      const newScrollY = { ...scrollRef.current, [path]: window.scrollY };
      setScrollY(newScrollY);

      scrollRef.current = newScrollY;
    }, 100);

    const resetScrollY = () => {
      setScrollY('');
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('unload', resetScrollY);

    return () => {
      setScrollY(scrollRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('unload', resetScrollY);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useScrollPosition;
