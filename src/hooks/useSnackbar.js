import { useState, useRef, useEffect } from 'react';
import useUpdateEffect from './useUpdateEffect';

const useSnackbar = (ms) => {
  const [message, setMessage] = useState('');
  const timer = useRef(null);

  useUpdateEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setMessage('');
    }, ms + 100); // add 100ms for fadeout animation
  }, [message]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
      setMessage('');
    };
  }, []);

  return [message, setMessage];
};

export default useSnackbar;
