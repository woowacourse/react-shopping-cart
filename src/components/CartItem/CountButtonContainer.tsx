import { css } from '@emotion/react';
import { useSetRecoilState } from 'recoil';

import { updateItemQuantity } from '@/apis/cartItem';
import { MINUS, PLUS } from '@/assets/images';
import { THEME } from '@/constants/theme';
import { cartItemsState } from '@/recoil/cartItems/atoms';
import { CartItemProps } from '@/types/cartItem';

interface CountButtonContainerProps {
  item: CartItemProps;
}

const CountButtonContainer = ({ item }: CountButtonContainerProps) => {
  const setCartItems = useSetRecoilState(cartItemsState);

  const handleDecrementQuantity = async () => {
    try {
      const newQuantity = Math.max(item.quantity - 1, 1);
      const { status } = await updateItemQuantity(item.id, newQuantity);

      if (status === 200) {
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem,
          ),
        );
      }
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(error.message);
    }
  };

  const handleIncrementQuantity = async () => {
    try {
      const { status } = await updateItemQuantity(item.id, item.quantity + 1);

      if (status === 200) {
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
          ),
        );
      }
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(error.message);
    }
  };

  return (
    <div css={countWrapper}>
      <button
        id="minus-button"
        css={countButton(item.quantity === 1)}
        onClick={handleDecrementQuantity}
        disabled={item.quantity === 1}
      >
        <img src={MINUS} alt={`${item.product.name}-minus`} />
      </button>
      <span>{item.quantity}</span>
      <button css={countButton()} onClick={handleIncrementQuantity}>
        <img src={PLUS} alt={`${item.product.name}-plus`} />
      </button>
    </div>
  );
};

export default CountButtonContainer;

const countWrapper = css`
  width: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const countButton = (isDisabled?: boolean) => css`
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${THEME.LIGHT_BLACK};
  border-radius: 8px;
  padding: 4px;

  background-color: ${THEME.WHITE};

  font-size: 24px;

  &:hover {
    opacity: ${isDisabled ? THEME.DISABLED_OPACITY : THEME.HOVER_OPACITY};
  }

  cursor: ${isDisabled ? 'auto' : 'pointer'};
  opacity: ${isDisabled ? THEME.DISABLED_OPACITY : 1};
`;
