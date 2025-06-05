import { CartProduct } from '../../types/cart';
import { woowaLogo } from '../../assets/index';
import {
  getCartItems,
  patchDecreaseQuantity,
  patchIncreaseQuantity,
  removeCartItem,
} from '../../apis/cart';
import { useData } from '../../context/DataContext';
import SelectBox from '../SelectBox/SelectBox';
import styled from '@emotion/styled';

interface CartItemProps {
  cartItem: CartProduct;
}

function CartItem({ cartItem }: CartItemProps) {
  const { refetch } = useData({
    fetcher: getCartItems,
    name: 'cartItems',
  });

  const handleRemoveCartItem = async () => {
    await removeCartItem(cartItem);
    refetch();
  };

  const handleIncreaseQuantity = async () => {
    await patchIncreaseQuantity(cartItem);
    refetch();
  };

  const handleDecreaseQuantity = async () => {
    if (cartItem.quantity === 1) {
      handleRemoveCartItem();
      return;
    }

    await patchDecreaseQuantity(cartItem);
    refetch();
  };

  return (
    <CartItemContainer>
      <SelectBox cartItem={cartItem} onRemove={handleRemoveCartItem} />
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
            <StepperButton data-testid="decrease-quantity-button" onClick={handleDecreaseQuantity}>
              −
            </StepperButton>
            <StepperQuantity data-testid="item-quantity">{cartItem.quantity}</StepperQuantity>
            <StepperButton data-testid="increase-quantity-button" onClick={handleIncreaseQuantity}>
              ＋
            </StepperButton>
          </StepperContainer>
        </CartContent>
      </ProductRow>
    </CartItemContainer>
  );
}

export default CartItem;

export const ProductTitle = styled.h2`
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
`;

export const ProductPrice = styled.p`
  margin: 4px 0 0 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  vertical-align: middle;
`;

export const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const StepperButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  font-size: 18px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #ccc;
  }

  &:active {
    background-color: #e8e8e8;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    &:hover {
      background-color: white;
      border-color: #ddd;
    }
  }
`;

export const StepperQuantity = styled.span`
  min-width: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  user-select: none;
`;

export const CartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const CartProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  background: #eee;
`;

export const ProductRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
  flex: 1;
`;
