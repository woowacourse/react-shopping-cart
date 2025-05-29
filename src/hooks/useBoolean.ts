import { useState } from 'react';

function useBoolean(initialValue: boolean): {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
} {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue((prev) => !prev);
  };

  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };

  return { value, setTrue, setFalse, toggle };
}

export default useBoolean;
