import { useState } from 'react';

export const useToggle = (initial: boolean = false) => {
  const [value, setValue] = useState<boolean>(initial);

  const on = () => setValue(true);
  const off = () => setValue(false);
  const toggle = () => setValue((v) => !v);

  return { value, on, off, toggle };
};
