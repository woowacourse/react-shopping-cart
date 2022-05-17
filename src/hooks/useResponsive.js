import { useCallback, useEffect, useState } from 'react';
import { deviceSizeStandard } from '../styles/Theme';

export default function useResponsive() {
  const [currentDevice, setCurrentDevice] = useState();

  const checkDisplayWidth = useCallback(({ target: { innerWidth } }) => {
    const { mobile, tablet } = deviceSizeStandard;
    if (innerWidth <= mobile) {
      setCurrentDevice('mobile');
      return;
    }
    if (innerWidth <= tablet) {
      setCurrentDevice('tablet');
      return;
    }
    setCurrentDevice('desktop');
  }, []);

  useEffect(() => {
    window.addEventListener('resize', checkDisplayWidth);
    return () => window.removeEventListener('resize', checkDisplayWidth);
  }, []);

  return currentDevice;
}
