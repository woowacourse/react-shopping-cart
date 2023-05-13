import React from 'react';

import * as Styled from './ProductStepper.styled';

import StepperEntryButton from '../StepperEntryButton/StepperEntryButton';
import Stepper from '../commons/Stepper/Stepper';
import useMyCartUpdater from '../../hooks/useMyCartUpdater';

interface ProductStepperProps {
  productId: number;
}

const ProductStepper = (props: ProductStepperProps) => {
  const { productId } = props;
  
  const { value, increaseValue } = useMyCartUpdater(productId, { min: 0, max: 99, step: 1 });

  return (
    <Styled.ProductStepper>
      {
        value
        ? <Stepper productId={productId} min={0} max={99} step={1} />
        : <StepperEntryButton onClick={increaseValue} />
      }
    </Styled.ProductStepper>
  );
};

export default React.memo(ProductStepper);
