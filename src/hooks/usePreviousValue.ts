import { useEffect, useRef } from 'react';

const usePreviousValue = <T>(value: T) => {
  const prevValue = useRef(value);

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return prevValue.current;
};

export default usePreviousValue;
