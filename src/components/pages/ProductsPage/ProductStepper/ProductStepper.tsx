import React from 'react';
import { useRecoilValue } from 'recoil';

import * as Styled from './ProductStepper.styled';

import StepperEntryButton from '../StepperEntryButton/StepperEntryButton';
import Stepper from '../../../commons/Stepper/Stepper';
import useStepper from '../../../../hooks/useStepper';

import StepperSettings from '../../../../constants/StepperSettings';
import { productCountSelector } from '../../../../recoil/cartState';
import { Product } from '../../../../types/Product';
import useCartUpdateApi from '../../../../hooks/useCartUpdateApi';
import useToggleSetterEffect from '../../../../hooks/useToggleSetter';
import useCartStateUpdateEffect from '../../../../hooks/useCartStateUpdateEffect';

interface ProductStepperProps {
  productId: number;
  product: Product;
}

const { MIN, MAX, STEP } = StepperSettings;

const ProductStepper = (props: ProductStepperProps) => {
  const { productId, product } = props;

  const defaultValue = useRecoilValue(productCountSelector(productId));

  const { value, increaseValue, decreaseValue, setValue } = useStepper(
    MIN,
    MAX,
    STEP,
    defaultValue
  );

  useCartUpdateApi(productId, value, setValue);
  useToggleSetterEffect(productId, value);
  useCartStateUpdateEffect(productId, value, product);

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
