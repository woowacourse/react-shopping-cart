import { useRef } from 'react';

const useDebounce = (callback: VoidFunction) => {
  const debounceId = useRef<NodeJS.Timeout>();
  return () => {
    if (debounceId.current) {
      clearTimeout(debounceId.current);
    }
    debounceId.current = setTimeout(() => {
      callback();
    }, 200);
  };
};

export default useDebounce;
