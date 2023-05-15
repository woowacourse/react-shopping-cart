import { useState } from 'react';

import { PRODUCT_COUNT, STEP_UNIT } from '@constants/product';
import useUpdateMyCart from './useUpdateCart';

import {
  StyledProductStepperButtonFlexBox,
  StyledProductStepperFlexBox,
} from '@components/pages/ProductsPage/ProductList/ProductItem/ProductStepper/ProductStepper.styled';
import StepperEntryButton from '@components/pages/ProductsPage/ProductList/ProductItem/StepperEntryButton/StepperEntryButton';
import Stepper from '@commons/Stepper/Stepper';
import Input from '@components/commons/Input/Input';
import Button from '@components/commons/Button/Button';
import * as Text from '@components/commons/Text/Text';

interface ProductStepperProps {
  productId: number;
}

const ProductStepper = (props: ProductStepperProps) => {
  const { productId } = props;
  const [productCount, setProductCount] = useState(0);

  useUpdateMyCart(productId, productCount);

  return (
    <>
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
          {({
            step,
            handleNumberInputChange,
            handleIncrementButtonClick,
            handleDecrementButtonClick,
          }) => (
            <StyledProductStepperFlexBox>
              <Input
                width="48px"
                height="28px"
                type="number"
                value={step}
                inputMode="numeric"
                aria-label="상품 개수 입력"
                onChange={handleNumberInputChange}
              />
              <StyledProductStepperButtonFlexBox>
                <Button
                  width="28px"
                  height="14px"
                  aria-label="상품 1개 추가"
                  backgroundColor="#white"
                  onClick={handleIncrementButtonClick}
                  type="button"
                  name="상품 추가 버튼"
                  border="1px solid #dddddd"
                >
                  <Text.BaseText
                    color="#333333"
                    fontSize="xx-small"
                    lineHeight="none"
                  >
                    ▲
                  </Text.BaseText>
                </Button>
                <Button
                  width="28px"
                  height="14px"
                  aria-label="상품 1개 삭제"
                  backgroundColor="#white"
                  onClick={handleDecrementButtonClick}
                  type="button"
                  name="상품 삭제 버튼"
                  border="1px solid #dddddd"
                >
                  <Text.BaseText
                    color="#333333"
                    fontSize="xx-small"
                    lineHeight="none"
                  >
                    ▼
                  </Text.BaseText>
                </Button>
              </StyledProductStepperButtonFlexBox>
            </StyledProductStepperFlexBox>
          )}
        </Stepper>
      )}
    </>
  );
};

export default ProductStepper;
