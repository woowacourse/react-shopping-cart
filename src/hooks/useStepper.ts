import { useCallback, useState } from 'react';

const useStepper = (min = 0, max = 100, step = 1, defaultValue = 0) => {
  const [value, setValue] = useState(defaultValue);

  const increaseValue = useCallback(() => {
    setValue((prev) => Math.min(prev + step, max));
  }, [step, max, setValue]);

  const decreaseValue = useCallback(() => {
    setValue((prev) => Math.max(prev - step, min));
  }, [step, min, setValue]);

  const setValueToNearestStep = useCallback(
    (newValue: number) => {
      if (Number.isNaN(newValue) || newValue < min || newValue > max) return;

      setValue(Math.round(newValue / step) * step);
    },
    [step, max, min, setValue]
  );

  return {
    value,
    increaseValue,
    decreaseValue,
    setValue: setValueToNearestStep,
  };
};

export default useStepper;
