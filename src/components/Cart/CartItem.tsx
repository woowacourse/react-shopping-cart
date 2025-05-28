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
import { BASE_URL, USER_TOKEN } from '../../apis/env';
import { getCartItems } from '../../apis/cart';

interface CartItemProps {
  cartItem: CartProduct;
  setCartItems: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}

function CartItem({ cartItem, setCartItems }: CartItemProps) {
  const [isChecked, setIsChecked] = useState(true);

  const handleIncreaseQuantity = async () => {
    try {
      await fetch(`${BASE_URL}/cart-items/${cartItem.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Basic ${USER_TOKEN}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          quantity: cartItem.quantity + 1,
        }),
      });
      const response = await getCartItems();
      setCartItems(response);
    } catch (error) {
      throw new Error('장바구니 상품 증가시 오류 발생');
    }
  };

  const handleDecreaseQuantity = async () => {
    try {
      await fetch(`${BASE_URL}/cart-items/${cartItem.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Basic ${USER_TOKEN}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          quantity: cartItem.quantity - 1,
        }),
      });
      const response = await getCartItems();
      setCartItems(response);
    } catch (error) {
      throw new Error('장바구니 상품 감소시 오류 발생');
    }
  };

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
          <ProductPrice>{cartItem.product.price.toLocaleString()}원</ProductPrice>
          <StepperContainer>
            <StepperButton
              disabled={cartItem.quantity === 1}
              onClick={() => handleDecreaseQuantity()}
            >
              −
            </StepperButton>
            <StepperQuantity>{cartItem.quantity}</StepperQuantity>
            <StepperButton onClick={() => handleIncreaseQuantity()}>＋</StepperButton>
          </StepperContainer>
        </CartContent>
      </ProductRow>
    </CartItemContainer>
  );
}

export default CartItem;
