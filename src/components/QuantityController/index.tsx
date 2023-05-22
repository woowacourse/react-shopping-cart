import { useState } from 'react';

import { Product, UpdateCartItem } from '@Types/index';

import {
  ALERT_MESSAGE,
  FETCH_METHOD,
  FETCH_URL,
  QUANTITY_CONTROL_BUTTON,
  QUANTITY_CONTROL_UNIT,
  SHOPPING_QUANTITY,
} from '@Constants/index';

import ShoppingCart from '@Asset/ShoppingCart.png';

import * as S from './style';

type QuantityControllerProps = {
  product?: Product;
  quantity?: number;
  cartItemId?: number;
  isAbleSetZeroState?: boolean;
  updateCartItem: UpdateCartItem;
};

type QuantityControlButton = (typeof QUANTITY_CONTROL_BUTTON)[keyof typeof QUANTITY_CONTROL_BUTTON];

function QuantityController({
  product,
  quantity = SHOPPING_QUANTITY.MIN,
  cartItemId,
  isAbleSetZeroState = true,
  updateCartItem,
}: QuantityControllerProps) {
  const [isUserWork, setIsUserWork] = useState(false);

  const controlProductQuantity = (type: QuantityControlButton) => {
    const newValue =
      type === QUANTITY_CONTROL_BUTTON.PLUS
        ? quantity + QUANTITY_CONTROL_UNIT.DECREASE
        : quantity - QUANTITY_CONTROL_UNIT.DECREASE;

    const method = newValue ? FETCH_METHOD.PATCH : FETCH_METHOD.DELETE;
    const body = newValue ? JSON.stringify({ quantity: newValue }) : null;
    updateCartItem(`${FETCH_URL.cartItems}/${cartItemId}`, method, body);
  };

  const addCartItem = () => {
    updateCartItem(FETCH_URL.cartItems, FETCH_METHOD.POST, JSON.stringify({ productId: product?.id }));
  };

  const changeQuantityValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);

    if (!isAbleSetZeroState && newValue < 1) return;

    if (newValue > SHOPPING_QUANTITY.MAX) return alert(ALERT_MESSAGE.OVER_MAX_QUANTITY);
    updateCartItem(`${FETCH_URL.cartItems}/${cartItemId}`, FETCH_METHOD.PATCH, JSON.stringify({ quantity: newValue }));
  };

  const focusInButton = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
    setIsUserWork(true);
  };

  const focusOutButton = () => {
    setIsUserWork(false);
    if (quantity) return;

    updateCartItem(`${FETCH_URL.cartItems}/${cartItemId}`, FETCH_METHOD.DELETE);
  };

  if (quantity === SHOPPING_QUANTITY.MIN && !isUserWork) {
    return (
      <S.ShoppingCartIcon
        src={ShoppingCart}
        onClick={addCartItem}
        data-testid="shopping-cart-icon"
      ></S.ShoppingCartIcon>
    );
  }

  return (
    <S.Container>
      <S.QuantityInput
        type="number"
        value={quantity}
        onChange={changeQuantityValue}
        onFocus={focusInButton}
        onBlur={focusOutButton}
      />
      <S.ButtonWrapper>
        <S.QuantityControlButton
          onClick={() => controlProductQuantity(QUANTITY_CONTROL_BUTTON.PLUS)}
          disabled={quantity >= SHOPPING_QUANTITY.MAX}
        >
          ▲
        </S.QuantityControlButton>
        <S.QuantityControlButton
          onClick={() => controlProductQuantity(QUANTITY_CONTROL_BUTTON.MINUS)}
          disabled={isAbleSetZeroState ? quantity <= SHOPPING_QUANTITY.MIN : quantity <= SHOPPING_QUANTITY.MIN + 1}
        >
          ▼
        </S.QuantityControlButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}

export default QuantityController;
