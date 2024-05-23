import { css } from '@emotion/react';
import { useSetRecoilState } from 'recoil';

import CartItemImage from '@/components/common/CartItemImage';
import { CartItemProps } from '@/types/cartItem';
import { updateItemQuantity } from '@apis/cartItem';
import { MINUS, PLUS } from '@assets/images';
import { cartItemsState } from '@recoil/cartItems/atoms';

interface CartItemMainSectionProps {
  item: CartItemProps;
}
export default function CartItemInfo({ item }: CartItemMainSectionProps) {
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
      <CartItemImage imageUrl={item.product.imageUrl} alt={item.product.name + '상품 이미지'} />

      <div css={cartItemInfoWrapper}>
        <span>{item.product.name}</span>
        <span css={price}>{item.product.price.toLocaleString('ko-KR')}원</span>
        <div css={countWrapper}>
          <button
            css={countButton(item.quantity === 1)}
            onClick={handleDecrementQuantity}
            disabled={item.quantity === 1}
          >
            <img css={countImage} src={MINUS} alt={item.product.name + '수량 감소 버튼'} />
          </button>
          <span data-testid={item.product.name + 'quantity'}>{item.quantity}</span>
          <button css={countButton()} onClick={handleIncrementQuantity}>
            <img css={countImage} src={PLUS} alt={item.product.name + '수량 증가 버튼'} />
          </button>
        </div>
      </div>
    </div>
  );
}

const cartItemBody = css`
  display: flex;
  gap: 20px;
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
