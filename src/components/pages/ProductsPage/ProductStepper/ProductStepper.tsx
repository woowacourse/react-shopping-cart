import React, { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import * as Styled from './ProductStepper.styled';

import StepperEntryButton from '../StepperEntryButton/StepperEntryButton';
import Stepper from '../../../commons/Stepper/Stepper';
import useStepper from '../../../../hooks/useStepper';

import StepperSettings from '../../../../constants/StepperSettings';
import { productToggleSelector } from '../../../../recoil/cartToggleState';
import usePreviousValue from '../../../../hooks/usePreviousValue';
import cartState, { productCountSelector } from '../../../../recoil/cartState';
import { Product } from '../../../../types/Product';
import useCartUpdateApi from '../../../../hooks/useCartUpdateApi';

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

  const prevValue = usePreviousValue(defaultValue);

  const updateProductQuantity = useSetRecoilState(productCountSelector(productId));
  const setCartState = useSetRecoilState(cartState);

  const toggleSetter = useSetRecoilState(productToggleSelector(productId));
  const deleteToggleInfo = useResetRecoilState(productToggleSelector(productId));

  const { serverPrevValue, serverValue } = useCartUpdateApi(productId, value, setValue);

  useEffect(() => {
    if (prevValue === value) return;

    if (prevValue === 0 && value > 0) {
      toggleSetter(true);
      return;
    }

    if (value === 0) {
      deleteToggleInfo();
    }
  }, [value]);

  useEffect(() => {
    if (prevValue === 0 && value > 0) {
      setCartState((prevCart) => [...prevCart, { product, id: productId, quantity: value }]);
      return;
    }

    updateProductQuantity(value);
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
