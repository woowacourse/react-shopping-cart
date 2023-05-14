import useProductCount from '@components/ProductStepper/useProductCount';

import { PRODUCT_COUNT, STEP_UNIT } from '@constants/product';

import {
  StyledProductStepper,
  StyledProductStepperButtonFlexBox,
  StyledProductStepperFlexBox,
} from '@components/ProductStepper/ProductStepper.styled';
import StepperEntryButton from '@components/StepperEntryButton/StepperEntryButton';
import Stepper from '@commons/Stepper/Stepper';
import Input from '@components/commons/Input/Input';
import Button from '@components/commons/Button/Button';

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
          step={productCount}
          setStep={setProductCount}
          stepUnit={STEP_UNIT}
          minStep={PRODUCT_COUNT.MIN}
          maxStep={PRODUCT_COUNT.MAX}
        >
          {({ step, handleNumberInput, handleIncrement, handleDecrement }) => (
            <StyledProductStepperFlexBox>
              <Input
                width="48px"
                height="28px"
                type="number"
                value={step}
                inputMode="numeric"
                aria-label="상품 개수 입력"
                alt="상품 개수 입력창"
                onChange={handleNumberInput}
              />
              <StyledProductStepperButtonFlexBox>
                <Button
                  ariaLabel="상품 1개 추가"
                  backgroundColor="#white"
                  text="▲"
                  fontSize="xx-small"
                  color="#333333"
                  onClick={handleIncrement}
                  type="button"
                  name="상품 추가 버튼"
                />
                <Button
                  ariaLabel="상품 1개 삭제"
                  backgroundColor="#white"
                  text="▼"
                  fontSize="xx-small"
                  color="#333333"
                  onClick={handleDecrement}
                  type="button"
                  name="상품 삭제 버튼"
                />
              </StyledProductStepperButtonFlexBox>
            </StyledProductStepperFlexBox>
          )}
        </Stepper>
      )}
    </StyledProductStepper>
  );
};

export default ProductStepper;
