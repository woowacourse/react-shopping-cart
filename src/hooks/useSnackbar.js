import { useState, useRef, useEffect } from 'react';
import useUpdateEffect from './useUpdateEffect';

const FADEOUT_TIME = 200;

const useSnackbar = (duration) => {
  const [message, setMessage] = useState({ text: '' });
  const timer = useRef(null);

  const setMessageText = (text) => {
    setMessage({ text });
  };

  useUpdateEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setMessageText('');
    }, duration + FADEOUT_TIME);
  }, [message]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
      setMessageText('');
    };
  }, []);

  return [message.text, setMessageText];
};

export default useSnackbar;
