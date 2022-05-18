import { useCallback, useRef, useState } from 'react';

const useSnackBar = () => {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const timerRef = useRef(null);
  const openSnackbar = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsOpenSnackbar(true);
    timerRef.current = setTimeout(() => {
      setIsOpenSnackbar(false);
    }, 3000);
  }, []);

  return { isOpenSnackbar, openSnackbar };
};

export default useSnackBar;
