import { memo, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import Stepper from '../../../commons/Stepper/Stepper';

import usePreviousValue from '../../../../hooks/usePreviousValue';
import useStepper from '../../../../hooks/useStepper';
import { productCountSelector } from '../../../../recoil/cartState';
import StepperSettings from '../../../../constants/StepperSettings';

interface CartStepperProps {
  productId: number;
  defaultValue: number;
}

const { MIN, MAX, STEP } = StepperSettings;

const CartStepper = (props: CartStepperProps) => {
  const { defaultValue, productId } = props;

  const updateProductQuantity = useSetRecoilState(productCountSelector(productId));

  const { value, increaseValue, decreaseValue, setValue } = useStepper(
    MIN + 1,
    MAX,
    STEP,
    defaultValue
  );
  const prevValue = usePreviousValue(value);

  useEffect(() => {
    if (prevValue === value) return;

    fetch(`/cart-items/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity: value }),
    });
  }, [value]);

  useEffect(() => {
    updateProductQuantity(value);
  }, [value]);

  return (
    <Stepper
      value={value}
      increaseValue={increaseValue}
      decreaseValue={decreaseValue}
      setValue={setValue}
    />
  );
};

export default memo(CartStepper);
