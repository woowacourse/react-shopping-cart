import ShoppingCart from '@Asset/ShoppingCart.png';
import { useState } from 'react';

import { Product, UpdateShoppingCart } from '@Types/index';

import { ALERT_MESSAGE, QUANTITY_CONTROL_BUTTON, QUANTITY_CONTROL_UNIT, SHOPPING_QUANTITY } from '@Constants/index';

import * as S from './style';

type QuantityControllerProps = {
  product: Product;
  quantity?: number;
  updateShoppingCart: UpdateShoppingCart;
};

type QuantityControlButton = (typeof QUANTITY_CONTROL_BUTTON)[keyof typeof QUANTITY_CONTROL_BUTTON];

function QuantityController({
  product,
  quantity = SHOPPING_QUANTITY.MIN,
  updateShoppingCart,
}: QuantityControllerProps) {
  const [isUserWork, setIsUserWork] = useState(false);

  const controlProductQuantity = (type: QuantityControlButton) => {
    if (type === QUANTITY_CONTROL_BUTTON.PLUS) {
      updateShoppingCart(product, quantity + QUANTITY_CONTROL_UNIT.INCREASE);
    } else {
      updateShoppingCart(product, quantity - QUANTITY_CONTROL_UNIT.DECREASE);
    }
  };

  const addShoppingCart = () => {
    updateShoppingCart(product, SHOPPING_QUANTITY.DEFAULT);
  };

  const changeQuantityValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);

    if (newValue > SHOPPING_QUANTITY.MAX) return alert(ALERT_MESSAGE.OVER_MAX_QUANTITY);

    updateShoppingCart(product, Math.floor(newValue));
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
