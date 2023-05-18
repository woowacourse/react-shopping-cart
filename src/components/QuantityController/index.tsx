import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { Product, UpdateShoppingCart } from '@Types/index';

import localStorageHelper from '@Utils/localStorageHelper';

import shoppingCartState from '@Atoms/shoppingCartState';

import { ALERT_MESSAGE, QUANTITY_CONTROL_BUTTON, QUANTITY_CONTROL_UNIT, SHOPPING_QUANTITY } from '@Constants/index';

import ShoppingCart from '@Asset/ShoppingCart.png';

import * as S from './style';

type QuantityControllerProps = {
  product: Product;
  quantity?: number;
  cartItemId?: number;
};

type QuantityControlButton = (typeof QUANTITY_CONTROL_BUTTON)[keyof typeof QUANTITY_CONTROL_BUTTON];

function QuantityController({ product, quantity = SHOPPING_QUANTITY.MIN, cartItemId }: QuantityControllerProps) {
  const [isUserWork, setIsUserWork] = useState(false);
  const updateShoppingCart = useSetRecoilState(shoppingCartState);

  const controlProductQuantity = async (type: QuantityControlButton) => {
    if (type === QUANTITY_CONTROL_BUTTON.PLUS) {
      await fetch(`/cart-items/${cartItemId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity: quantity + QUANTITY_CONTROL_UNIT.DECREASE }),
      });
      updateShoppingCart(localStorageHelper.getValue('cartItems'));
    } else {
      if (quantity - QUANTITY_CONTROL_UNIT.DECREASE === 0) {
        await fetch(`/cart-items/${cartItemId}`, {
          method: 'DELETE',
        });
        updateShoppingCart(localStorageHelper.getValue('cartItems'));
      } else {
        await fetch(`/cart-items/${cartItemId}`, {
          method: 'PATCH',
          body: JSON.stringify({ quantity: quantity - QUANTITY_CONTROL_UNIT.DECREASE }),
        });
        updateShoppingCart(localStorageHelper.getValue('cartItems'));
      }
    }
  };

  const addShoppingCart = async () => {
    await fetch('/api/cart-items', {
      method: 'POST',
      body: JSON.stringify({ productId: product.id }),
    });
    updateShoppingCart(localStorageHelper.getValue('cartItems'));
  };

  const changeQuantityValue = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);

    if (newValue > SHOPPING_QUANTITY.MAX) return alert(ALERT_MESSAGE.OVER_MAX_QUANTITY);

    if (newValue === 0) {
      await fetch(`/cart-items/${cartItemId}`, {
        method: 'DELETE',
      });
      updateShoppingCart(localStorageHelper.getValue('cartItems'));
    } else {
      await fetch(`/cart-items/${cartItemId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity: newValue }),
      });
      updateShoppingCart(localStorageHelper.getValue('cartItems'));
    }
  };

  if (quantity === SHOPPING_QUANTITY.MIN && !isUserWork) {
    return (
      <S.ShoppingCartIcon
        src={ShoppingCart}
        onClick={addShoppingCart}
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
        onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
          event.target.select();
          setIsUserWork(true);
        }}
        onBlur={() => {
          setIsUserWork(false);
        }}
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
          disabled={quantity <= SHOPPING_QUANTITY.MIN}
        >
          ▼
        </S.QuantityControlButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}

export default QuantityController;
