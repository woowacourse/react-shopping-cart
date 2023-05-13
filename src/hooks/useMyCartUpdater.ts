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
  }, [step, max, productId]);

  const decreaseValue = useCallback(() => {
    setValue((prev) => Math.max(prev - step, min));
  }, [step, min, productId]);

  const setValueToNearestStep = useCallback((newValue: number) => {
    if (Number.isNaN(newValue) || newValue < min || newValue > max) return;
    
    setValue(Math.round(newValue / step) * step);
  }, [step, max, min, productId]);

  return {
    value,
    increaseValue,
    decreaseValue,
    setValue: setValueToNearestStep,
  };
};

export default useMyCartUpdater;
