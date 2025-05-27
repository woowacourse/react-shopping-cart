import { useState } from 'react';
import {
  ProductPrice,
  ProductTitle,
  StepperContainer,
  StepperButton,
  StepperQuantity,
  ModifyRow,
  DeleteButton,
  CartItemContainer,
  CartProductImage,
  ProductRow,
  CartContent,
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
} from './Cart.styles';

function CartItem() {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <CartItemContainer>
      <ModifyRow>
        <CheckboxContainer>
          <HiddenCheckbox
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <StyledCheckbox checked={isChecked} />
        </CheckboxContainer>
        <DeleteButton>삭제</DeleteButton>
      </ModifyRow>

      <ProductRow>
        <CartProductImage src={''} />
        <CartContent>
          <ProductTitle>상품이름A</ProductTitle>
          <ProductPrice>35,000원</ProductPrice>
          <StepperContainer>
            <StepperButton disabled={true}>−</StepperButton>
            <StepperQuantity>2</StepperQuantity>
            <StepperButton>＋</StepperButton>
          </StepperContainer>
        </CartContent>
      </ProductRow>
    </CartItemContainer>
  );
}

export default CartItem;
