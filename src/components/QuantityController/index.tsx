import ShoppingCart from '@Asset/ShoppingCart.png';
import { useState } from 'react';

import { ALERT_MESSAGE, QUANTITY_CONTROL_BUTTON, QUANTITY_CONTROL_UNIT, SHOPPING_QUANTITY } from '@Constants/index';

import * as S from './style';

type QuantityControllerProps = {
  quantity: number;
  changeProductQuantity: (quantity: number) => void;
  minCount?: number;
};

type QuantityControlButton = (typeof QUANTITY_CONTROL_BUTTON)[keyof typeof QUANTITY_CONTROL_BUTTON];

function QuantityController({
  quantity,
  changeProductQuantity,
  minCount = SHOPPING_QUANTITY.MIN,
}: QuantityControllerProps) {
  const [proceeding, setProceeding] = useState(Boolean);

  const changeQuantityDefault = () => {
    changeProductQuantity(SHOPPING_QUANTITY.DEFAULT);
  };
  if (quantity === SHOPPING_QUANTITY.MIN && !proceeding)
    return (
      <S.ShoppingCartIcon
        tab-index="0"
        src={ShoppingCart}
        onClick={changeQuantityDefault}
        data-testid="shopping-cart-icon"
      ></S.ShoppingCartIcon>
    );

  const updateQuantityWithButton = (type: QuantityControlButton) => {
    if (type === QUANTITY_CONTROL_BUTTON.PLUS) {
      changeProductQuantity(quantity + QUANTITY_CONTROL_UNIT.INCREASE);
      return;
    }

    changeProductQuantity(quantity - QUANTITY_CONTROL_UNIT.DECREASE);
  };

  const updateQuantityWithInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.floor(Number(event.target.value));

    if (newValue > SHOPPING_QUANTITY.MAX) {
      changeProductQuantity(SHOPPING_QUANTITY.MAX);
      alert(ALERT_MESSAGE.OVER_MAX_QUANTITY);
      return;
    }

    changeProductQuantity(newValue);
  };

  return (
    <S.Container>
      <S.QuantityInput
        type="number"
        value={`${quantity}`}
        onChange={updateQuantityWithInput}
        onFocus={() => setProceeding(true)}
        onBlur={() => setProceeding(false)}
      />
      <S.ButtonWrapper>
        <S.QuantityControlButton
          onClick={() => updateQuantityWithButton(QUANTITY_CONTROL_BUTTON.PLUS)}
          disabled={quantity >= SHOPPING_QUANTITY.MAX}
        >
          ▲
        </S.QuantityControlButton>
        <S.QuantityControlButton
          onClick={() => updateQuantityWithButton(QUANTITY_CONTROL_BUTTON.MINUS)}
          disabled={quantity <= minCount}
        >
          ▼
        </S.QuantityControlButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}

export default QuantityController;
