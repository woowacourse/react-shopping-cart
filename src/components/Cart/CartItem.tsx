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
import {
  getCartItems,
  patchDecreaseQuantity,
  patchIncreaseQuantity,
  removeCartItem,
} from '../../apis/cart';
import { useData } from '../../context/DataContext';

interface CartItemProps {
  cartItem: CartProduct;
}

function CartItem({ cartItem }: CartItemProps) {
  const [isChecked, setIsChecked] = useState(true);
  const { refetch } = useData({
    fetcher: getCartItems,
    name: 'cartItems',
  });

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
        <DeleteButton
          onClick={async () => {
            await removeCartItem(cartItem);
            refetch();
          }}
        >
          삭제
        </DeleteButton>
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
            <StepperButton onClick={() => patchDecreaseQuantity(cartItem)}>−</StepperButton>
            <StepperQuantity>{cartItem.quantity}</StepperQuantity>
            <StepperButton onClick={() => patchIncreaseQuantity(cartItem)}>＋</StepperButton>
          </StepperContainer>
        </CartContent>
      </ProductRow>
    </CartItemContainer>
  );
}

export default CartItem;
