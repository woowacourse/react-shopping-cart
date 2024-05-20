import { css } from '@emotion/react';
import { useSetRecoilState } from 'recoil';

import Button from '../common/Button';

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
    if (item.quantity <= 1) return;

    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) }
          : cartItem,
      ),
    );

    try {
      await updateItemQuantity(item.id, item.quantity - 1);
    } catch {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        ),
      );
    }
  };

  const handleIncrementQuantity = async () => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      ),
    );

    try {
      await updateItemQuantity(item.id, item.quantity + 1);
    } catch {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) }
            : cartItem,
        ),
      );
    }
  };

  return (
    <div css={cartItemBody}>
      <img
        css={image}
        src={item.product.imageUrl}
        width={112}
        height={112}
        alt={item.product.name + 'image'}
      />
      <div css={cartItemInfoWrapper}>
        <span>{item.product.name}</span>
        <span css={price}>{item.product.price.toLocaleString('ko-KR')}원</span>
        <div css={countWrapper}>
          <Button
            id={item.product.name + 'minus-button'}
            css={countButton(item.quantity === 1)}
            onClick={handleDecrementQuantity}
            disabled={item.quantity === 1}
          >
            <img css={countImage} src={MINUS} alt="minus icon" />
          </Button>
          <span data-testid={item.product.name + 'quantity'}>{item.quantity}</span>
          <Button
            id={item.product.name + 'plus-button'}
            css={countButton()}
            onClick={handleIncrementQuantity}
          >
            <img css={countImage} src={PLUS} alt="plus icon" />
          </Button>
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

  padding: 0;

  border-radius: 8px;

  background-color: #fff;

  font-size: 24px;

  &:hover {
    opacity: ${isDisabled ? 0.1 : 0.6};
  }

  cursor: ${isDisabled ? 'auto' : 'pointer'};
  opacity: ${isDisabled ? 0.1 : 1};
`;

const countImage = css`
  width: 100%;
  height: 100%;
`;
