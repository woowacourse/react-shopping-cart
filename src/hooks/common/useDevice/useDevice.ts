import { useEffect, useState } from 'react';

import { Device } from './type';
import { DEVICE_WIDTHS } from './constant';

export default function useDevice() {
  const [device, setDevice] = useState<Device>('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < DEVICE_WIDTHS.mobile) setDevice('mobile');
      else if (window.innerWidth >= DEVICE_WIDTHS.mobile && window.innerWidth < DEVICE_WIDTHS.tablet)
        setDevice('tablet');
      else setDevice('desktop');
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
}
