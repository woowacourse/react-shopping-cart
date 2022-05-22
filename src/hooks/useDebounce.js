import { useRef } from 'react';

function useDebounce() {
  const timeOut = useRef();

  const debounce = (cb, delay) => {
    clearTimeout(timeOut.current);

    timeOut.current = setTimeout(cb, delay);
  };

  return debounce;
}

export default useDebounce;
