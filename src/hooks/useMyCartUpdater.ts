import { useCallback } from "react";
import { productCountSelector } from "../recoil/myCartState";
import { useRecoilState } from "recoil";

const defaultOptions = {
  min: 0,
  max: 100,
  step: 1,
};

const useMyCartUpdater = (
  productId: number,
  options?: {
    min?: number;
    max?: number;
    step?: number;
  },
) => {
  const { min, max, step } = Object.assign({}, defaultOptions, options);

  const [value, setValue] = useRecoilState(productCountSelector(productId));

  const increaseValue = useCallback(() => {
    setValue((prev) => Math.min(prev + step, max));
  }, [step, max, setValue]);

  const decreaseValue = useCallback(() => {
    setValue((prev) => Math.max(prev - step, min));
  }, [step, min, setValue]);

  const setValueToNearestStep = useCallback((newValue: number) => {
    if (Number.isNaN(newValue) || newValue < min || newValue > max) return;
    
    setValue(Math.round(newValue / step) * step);
  }, [step, max, min, setValue]);

  return {
    value,
    increaseValue,
    decreaseValue,
    setValue: setValueToNearestStep,
  };
};

export default useMyCartUpdater;
