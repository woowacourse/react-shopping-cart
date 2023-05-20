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

  const prevValue = usePreviousValue(value);
  const updateProductQuantity = useSetRecoilState(productCountSelector(productId));
  const setCartState = useSetRecoilState(cartState);

  const toggleSetter = useSetRecoilState(productToggleSelector(productId));
  const deleteToggleInfo = useResetRecoilState(productToggleSelector(productId));

  useEffect(() => {
    if (prevValue === value) return;

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
      method: 'PATCH',
      body: JSON.stringify({ quantity: value }),
    });
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
