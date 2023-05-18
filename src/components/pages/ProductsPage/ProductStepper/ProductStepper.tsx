import React, { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import * as Styled from './ProductStepper.styled';

import StepperEntryButton from '../StepperEntryButton/StepperEntryButton';
import Stepper from '../../../commons/Stepper/Stepper';
import useStepper from '../../../../hooks/useStepper';

import StepperSettings from '../../../../constants/StepperSettings';
import { productToggleSelector } from '../../../../recoil/cartToggleState';
import usePreviousValue from '../../../../hooks/usePreviousValue';

interface ProductStepperProps {
  productId: number;
  defaultValue: number;
}

const { MIN, MAX, STEP } = StepperSettings;

const ProductStepper = (props: ProductStepperProps) => {
  const { productId, defaultValue } = props;

  const { value, increaseValue, decreaseValue, setValue } = useStepper(
    MIN,
    MAX,
    STEP,
    defaultValue
  );

  const prevValue = usePreviousValue(value);

  const toggleSetter = useSetRecoilState(productToggleSelector(productId));
  const deleteToggleInfo = useResetRecoilState(productToggleSelector(productId));

  useEffect(() => {
    if (prevValue === 0 && value > 0) {
      toggleSetter(true);
      fetch('/cart-items', { method: 'POST', body: JSON.stringify({ productId }) });
      return;
    }

    if (value === 0) {
      deleteToggleInfo();
      fetch(`/cart-items/${productId}`, { method: 'DELETE' });
      return;
    }

    fetch(`/cart-items/${productId}`, {
      method: 'POST',
      body: JSON.stringify({ quantity: value }),
    });
  }, [value]);

  return (
    <Styled.ProductStepper>
      {value ? (
        <Stepper
          value={value}
          increaseValue={increaseValue}
          decreaseValue={decreaseValue}
          setValue={setValue}
        />
      ) : (
        <StepperEntryButton onClick={increaseValue} />
      )}
    </Styled.ProductStepper>
  );
};

export default React.memo(ProductStepper);
