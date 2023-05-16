import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Stepper } from '@commons/Stepper/Stepper';
import {
  StyledProductStepperButtonFlexBox,
  StyledProductStepperFlexBox,
} from '@components/pages/ProductsPage/ProductList/ProductItem/ProductStepper/ProductStepper.styled';
import { Input as StepInput } from '@commons/Input/Input';
import { Button as StepperHandleButton } from '@commons/Button/Button';
import * as Text from '../Text/Text';

/**
 * 스탭퍼
 */

const meta: Meta<typeof Stepper> = {
  title: 'Stepper',
  component: Stepper,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Stepper>;

const Wrapper = () => {
  const [productCount, setProductCount] = useState(1);

  return (
    <Stepper
      step={productCount}
      setStep={setProductCount}
      stepUnit={1}
      minStep={1}
      maxStep={99}
    >
      {({
        step,
        handleNumberInputChange,
        handleIncrementButtonClick,
        handleDecrementButtonClick,
      }) => (
        <StyledProductStepperFlexBox>
          <StepInput
            width="48px"
            height="28px"
            type="number"
            value={step}
            inputMode="numeric"
            aria-label="상품 개수 입력"
            alt="상품 개수 입력창"
            onChange={handleNumberInputChange}
          />
          <StyledProductStepperButtonFlexBox>
            <StepperHandleButton
              ariaLabel="상품 1개 추가"
              backgroundColor="#white"
              onClick={handleIncrementButtonClick}
              type="button"
              name="상품 추가 버튼"
              border="1px solid #333333"
            >
              <Text.Paragraph fontSize="xx-small" color="#333333">
                ▲
              </Text.Paragraph>
            </StepperHandleButton>
            <StepperHandleButton
              ariaLabel="상품 1개 삭제"
              backgroundColor="#white"
              onClick={handleDecrementButtonClick}
              type="button"
              name="상품 삭제 버튼"
              border="1px solid #333333"
            >
              <Text.Paragraph fontSize="xx-small" color="#333333">
                ▼
              </Text.Paragraph>
            </StepperHandleButton>
          </StyledProductStepperButtonFlexBox>
        </StyledProductStepperFlexBox>
      )}
    </Stepper>
  );
};

export const Default: Story = {
  render: () => <Wrapper />,
};
