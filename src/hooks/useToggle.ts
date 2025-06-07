import { useState, useCallback } from 'react';

export const useToggle = (initial: boolean = false) => {
  const [value, setValue] = useState<boolean>(initial);

  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((v) => !v), []);

  return { value, on, off, toggle };
};
