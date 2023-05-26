import { useEffect, useState } from 'react';

import { PRODUCT_COUNT, STEP_UNIT } from '@constants/product';
import fetchApis from '@apis/fetchApis';
import useUpdateCart from './useUpdateCart';

import {
  StyledProductStepperButtonFlexBox,
  StyledProductStepperFlexBox,
} from '@components/pages/ProductsPage/ProductList/ProductItem/ProductStepper/ProductStepper.styled';
import StepperEntryButton from '@components/pages/ProductsPage/ProductList/ProductItem/StepperEntryButton/StepperEntryButton';
import { Stepper } from '@commons/Stepper/Stepper';
import { Input as StepInput } from '@components/commons/Input/Input';
import { Button as StepperHandleButton } from '@components/commons/Button/Button';
import * as Text from '@components/commons/Text/Text';

interface ProductStepperProps {
  productId: number;
  initQuantity: number;
  initCartItemId?: string | null;
  inputWidth?: string | undefined;
  inputHeight?: string | undefined;
  buttonWidth?: string | undefined;
  buttonHeight?: string | undefined;
}

const ProductStepper = (props: ProductStepperProps) => {
  const {
    productId,
    initQuantity,
    initCartItemId,
    inputWidth,
    inputHeight,
    buttonWidth,
    buttonHeight,
  } = props;
  const [quantity, setQuantity] = useState(initQuantity);
  const [cartItemId, setCartItemId] = useState<null | string>(
    initCartItemId ?? null
  );
  const { postData, patchData, deleteData } = fetchApis();

  const addCartItem = async () => {
    const location = await postData(
      { productId: productId },
      '/cart-items',
      ''
    );

    setCartItemId(location);
  };

  const updateCartItemQuantity = async (newQuantity: number) => {
    if (!cartItemId) return;

    await patchData({ quantity: newQuantity }, '/cart-items', cartItemId);
  };

  const deleteCartItem = async (newQuantity: number) => {
    if (!cartItemId) return;

    if (newQuantity > 0) {
      updateCartItemQuantity(newQuantity);

      return;
    }

    await deleteData('/cart-items', cartItemId);
  };

  useUpdateCart(productId, quantity);

  useEffect(() => {
    setQuantity(initQuantity);
  }, [initQuantity]);

  return (
    <>
      {quantity === 0 ? (
        <StepperEntryButton
          onClick={() => {
            setQuantity(prev => prev + 1);
            addCartItem();
          }}
        />
      ) : (
        <Stepper
          step={quantity}
          setStep={setQuantity}
          stepUnit={STEP_UNIT}
          minStep={PRODUCT_COUNT.MIN}
          maxStep={PRODUCT_COUNT.MAX}
        >
          {({
            step,
            handleNumberInputChange,
            handleIncrementButtonClick,
            handleDecrementButtonClick,
          }) => {
            return (
              <StyledProductStepperFlexBox>
                <StepInput
                  width={inputWidth ?? '48px'}
                  height={inputHeight ?? '28px'}
                  type="number"
                  value={step}
                  inputMode="numeric"
                  role="textbox"
                  aria-label="상품 개수 입력"
                  onChange={handleNumberInputChange}
                />
                <StyledProductStepperButtonFlexBox>
                  <StepperHandleButton
                    width={buttonWidth ?? '28px'}
                    height={buttonHeight ?? '14px'}
                    aria-label="상품 1개 추가"
                    backgroundColor="#white"
                    onClick={() => {
                      handleIncrementButtonClick();
                      updateCartItemQuantity(step + STEP_UNIT);
                    }}
                    type="button"
                    name="상품 추가 버튼"
                    border="1px solid #dddddd"
                  >
                    <Text.Paragraph color="#333333" fontSize="xx-small">
                      ▲
                    </Text.Paragraph>
                  </StepperHandleButton>
                  <StepperHandleButton
                    width={buttonWidth ?? '28px'}
                    height={buttonHeight ?? '14px'}
                    aria-label="상품 1개 삭제"
                    backgroundColor="#white"
                    onClick={() => {
                      handleDecrementButtonClick();
                      deleteCartItem(step - STEP_UNIT);
                    }}
                    type="button"
                    name="상품 삭제 버튼"
                    border="1px solid #dddddd"
                  >
                    <Text.Paragraph color="#333333" fontSize="xx-small">
                      ▼
                    </Text.Paragraph>
                  </StepperHandleButton>
                </StyledProductStepperButtonFlexBox>
              </StyledProductStepperFlexBox>
            );
          }}
        </Stepper>
      )}
    </>
  );
};

export default ProductStepper;
