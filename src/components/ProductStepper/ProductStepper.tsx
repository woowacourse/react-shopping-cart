import useProductCount from '@hooks/useProductCount';

import { StyledProductStepper } from '@components/ProductStepper/ProductStepper.styled';
import StepperEntryButton from '@components/StepperEntryButton/StepperEntryButton';
import Stepper from '@commons/Stepper/Stepper';

interface ProductStepperProps {
  productId: number;
}

const ProductStepper = (props: ProductStepperProps) => {
  const { productId } = props;
  const { productCount, setProductCount } = useProductCount(productId);

  return (
    <StyledProductStepper>
      {productCount === 0 ? (
        <StepperEntryButton onClick={() => setProductCount(prev => prev + 1)} />
      ) : (
        <Stepper
          productCount={productCount}
          step={1}
          setProductCount={setProductCount}
        />
      )}
    </StyledProductStepper>
  );
};

export default ProductStepper;
