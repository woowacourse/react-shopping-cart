import { useCallback, useEffect, useState } from 'react';
import { size } from '../styles/Theme';
const getDevice = () => {
  const {
    visualViewport: { width: vw },
  } = window;

  if (vw >= size.desktop) {
    return 'desktop';
  }

  if (vw >= size.tablet) {
    return 'tablet';
  }

  return 'mobile';
};
export default function useResponsive() {
  const [device, setDevice] = useState(() => getDevice());

  const updateWindowWidth = useCallback(() => {
    const device = getDevice();
    setDevice(device);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return device;
}
