import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { debounce } from '../utils/debounce';

const useScrollPosition = (isScrollPushed) => {
  const path = window.location.pathname;
  const [scrollY, setScrollY] = useLocalStorage('scrollY', { [path]: 0 });

  useEffect(() => {
    const handleScroll = debounce(() => {
      const newScrollY = { ...scrollY, [path]: window.scrollY };
      setScrollY(newScrollY);
    }, 150);

    const resetScrollY = () => {
      setScrollY('');
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('unload', resetScrollY);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('unload', resetScrollY);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isScrollPushed) return;

    window.scrollTo({ top: scrollY[path], left: 0, behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScrollPushed]);
};

export default useScrollPosition;
