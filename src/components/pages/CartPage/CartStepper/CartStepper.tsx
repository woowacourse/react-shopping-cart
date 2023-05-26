import { memo } from 'react';

import Stepper from '../../../commons/Stepper/Stepper';

import useStepper from '../../../../hooks/useStepper';
import StepperSettings from '../../../../constants/StepperSettings';
import useCartUpdateApi from '../../../../hooks/useCartUpdateApi';
import useCartStateUpdateEffect from '../../../../hooks/useCartStateUpdateEffect';

interface CartStepperProps {
  productId: number;
  defaultValue: number;
}

const { MIN, MAX, STEP } = StepperSettings;

const CartStepper = (props: CartStepperProps) => {
  const { defaultValue, productId } = props;

  const { value, increaseValue, decreaseValue, setValue } = useStepper(
    MIN + 1,
    MAX,
    STEP,
    defaultValue
  );

  useCartUpdateApi(productId, value, setValue);
  useCartStateUpdateEffect(productId, value);

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
