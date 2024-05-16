import { css } from '@emotion/react';
import { useSetRecoilState } from 'recoil';

import { CartItemProps } from '@/types/cartItem';
import { updateItemQuantity } from '@apis/cartItem';
import { MINUS, PLUS } from '@assets/images';
import { cartItemsState } from '@recoil/cartItems/atoms';

interface CartItemMainSectionProps {
  item: CartItemProps;
}
const CartItemMainSection = ({ item }: CartItemMainSectionProps) => {
  const setCartItems = useSetRecoilState(cartItemsState);

  const handleDecrementQuantity = async () => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) }
          : cartItem,
      ),
    );
    await updateItemQuantity(item.id, item.quantity - 1);
  };

  const handleIncrementQuantity = async () => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      ),
    );

    await updateItemQuantity(item.id, item.quantity + 1);
  };

  return (
    <div css={cartItemBody}>
      <img css={image} src={item.product.imageUrl} width={112} height={112} />
      <div css={cartItemInfoWrapper}>
        <span>{item.product.name}</span>
        <span css={price}>{item.product.price.toLocaleString('ko-KR')}원</span>
        <div css={countWrapper}>
          <button
            css={countButton(item.quantity === 1)}
            onClick={handleDecrementQuantity}
            disabled={item.quantity === 1}
          >
            <img src={MINUS} />
          </button>
          <span>{item.quantity}</span>
          <button css={countButton()} onClick={handleIncrementQuantity}>
            <img src={PLUS} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemMainSection;

const cartItemBody = css`
  display: flex;
  gap: 20px;
`;

const image = css`
  border-radius: 8px;
`;

const cartItemInfoWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const countWrapper = css`
  width: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const price = css`
  font-weight: 700;
  font-size: 24px;
`;

const countButton = (isDisabled?: boolean) => css`
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #0000001a;
  border-radius: 8px;
  padding: 4px;

  background-color: #fff;

  font-size: 24px;

  &:hover {
    opacity: ${isDisabled ? 0.1 : 0.6};
  }

  cursor: ${isDisabled ? 'auto' : 'pointer'};
  opacity: ${isDisabled ? 0.1 : 1};
`;
