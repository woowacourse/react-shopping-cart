import { useCallback, useEffect, useState } from 'react';
import { size } from '../styles/Theme';

export default function useResponsive() {
  const [isTablet, setIsTablet] = useState(false);

  const updateWindowWidth = useCallback(() => {
    if (window.visualViewport.width >= size.tablet) {
      setIsTablet(true);
      return;
    }
    setIsTablet(false);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return isTablet;
}
