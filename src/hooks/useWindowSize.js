import { useCallback, useEffect, useState } from 'react';

export default function useWindowsSize() {
  const [windowSize, setWindowSize] = useState();

  const handleWindowSizeChange = useCallback(({ target: { innerWidth } }) => {
    setWindowSize(innerWidth);
  });

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => window.removeEventListener('resize', handleWindowSizeChange);
  }, []);

  return windowSize;
}
