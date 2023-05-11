import * as S from './style';

import ShoppingCart from '@Asset/ShoppingCart.png';

import { Product, UpdateShoppingBasket } from '@Types/index';
import { ALERT_MESSAGE, QUANTITY_CONTROL_BUTTON, QUANTITY_CONTROL_UNIT, SHOPPING_QUANTITY } from '@Constants/index';

import { useState } from 'react';

type QuantityControllerProps = {
  product: Product;
  quantity?: number;
  updateShoppingBasket: UpdateShoppingBasket;
};

type QuantityControlButton = (typeof QUANTITY_CONTROL_BUTTON)[keyof typeof QUANTITY_CONTROL_BUTTON];

function QuantityController({
  product,
  quantity = SHOPPING_QUANTITY.MIN,
  updateShoppingBasket,
}: QuantityControllerProps) {
  const [isBlur, setIsBlur] = useState(true);

  const handleClickQuantityControlButton = (type: QuantityControlButton) => {
    if (type === QUANTITY_CONTROL_BUTTON.PLUS) updateShoppingBasket(product, quantity + QUANTITY_CONTROL_UNIT.INCREASE);
    else updateShoppingBasket(product, quantity - QUANTITY_CONTROL_UNIT.DECREASE);
  };

  const handleClickCartIcon = () => {
    updateShoppingBasket(product, SHOPPING_QUANTITY.DEFAULT);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);

    if (newValue > SHOPPING_QUANTITY.MAX) return alert(ALERT_MESSAGE.OVER_MAX_QUANTITY);

    updateShoppingBasket(product, Math.floor(newValue));
  };

  return quantity === SHOPPING_QUANTITY.MIN && isBlur ? (
    <S.ShoppingCartIcon src={ShoppingCart} onClick={handleClickCartIcon}></S.ShoppingCartIcon>
  ) : (
    <S.Container>
      <S.QuantityInput
        type="number"
        value={quantity}
        onChange={handleChangeInput}
        onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
          event.target.select();
          setIsBlur(false);
        }}
        onBlur={() => {
          setIsBlur(true);
        }}
      />
      <S.ButtonWrapper>
        <S.QuantityControlButton
          onClick={() => handleClickQuantityControlButton(QUANTITY_CONTROL_BUTTON.PLUS)}
          disabled={quantity >= SHOPPING_QUANTITY.MAX}
        >
          ▲
        </S.QuantityControlButton>
        <S.QuantityControlButton
          onClick={() => handleClickQuantityControlButton(QUANTITY_CONTROL_BUTTON.MINUS)}
          disabled={quantity <= SHOPPING_QUANTITY.MIN}
        >
          ▼
        </S.QuantityControlButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}

export default QuantityController;
