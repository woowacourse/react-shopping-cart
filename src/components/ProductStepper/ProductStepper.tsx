import React from 'react';

import * as Styled from './ProductStepper.styled';

import StepperEntryButton from '../StepperEntryButton/StepperEntryButton';
import Stepper from '../commons/Stepper/Stepper';
import useMyCartUpdater from '../../hooks/useMyCartUpdater';

import StepperSettings from '../../constants/StepperSettings';

interface ProductStepperProps {
  productId: number;
}

const { MIN, MAX, STEP } = StepperSettings;

const ProductStepper = (props: ProductStepperProps) => {
  const { productId } = props;
  
  const { value, increaseValue } = useMyCartUpdater(
    productId, 
    { min: MIN, max: MAX, step: STEP },
  );

  return (
    <Styled.ProductStepper>
      {
        value
        ? <Stepper productId={productId} min={MIN} max={MAX} step={STEP} />
        : <StepperEntryButton onClick={increaseValue} />
      }
    </Styled.ProductStepper>
  );
};

export default React.memo(ProductStepper);
