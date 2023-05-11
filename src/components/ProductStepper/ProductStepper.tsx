import useProductCount from '../../hooks/useProductCount';

import * as Styled from './ProductStepper.styled';
import StepperEntryButton from '../StepperEntryButton/StepperEntryButton';
import Stepper from '../commons/Stepper/Stepper';

interface ProductStepperProps {
  productId: number;
}

const ProductStepper = (props: ProductStepperProps) => {
  const { productId } = props;
  const { productCount, setProductCount } = useProductCount(productId);

  return (
    <Styled.ProductStepper>
      {productCount === 0 ? (
        <StepperEntryButton onClick={() => setProductCount(prev => prev + 1)} />
      ) : (
        <Stepper
          productCount={productCount}
          setProductCount={setProductCount}
        />
      )}
    </Styled.ProductStepper>
  );
};

export default ProductStepper;
