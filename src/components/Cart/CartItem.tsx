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
import { CartProduct } from '../../types/cart';
import { woowaLogo } from '../../assets/index';

interface CartItemProps {
  cartItem: CartProduct;
}

function CartItem({ cartItem }: CartItemProps) {
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
        <CartProductImage
          src={cartItem.product.imageUrl}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = woowaLogo;
          }}
        />
        <CartContent>
          <ProductTitle>{cartItem.product.name}</ProductTitle>
          <ProductPrice>{cartItem.product.price}원</ProductPrice>
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
