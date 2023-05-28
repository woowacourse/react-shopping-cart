import { ChangeEvent } from 'react';

import * as styled from './Stepper.styled';

import { useUpdateCart } from '../../../hooks/useUpdateCart';

import { Button } from '../Button/Button';

import { QUANTITY } from '../../../constants';

interface Props {
  cartId: number;
  quantity: number;
}

export const Stepper = ({ cartId, quantity }: Props) => {
  const { increaseProductQuantity, decreaseProductQuantity, updateProductQuantity } =
    useUpdateCart();

  const onClickPlusButton = () => {
    if (quantity === QUANTITY.MAX) return;

    increaseProductQuantity(cartId, quantity + 1);
  };

  const onClickMinusButton = () => {
    if (quantity === QUANTITY.MIN) return;

    decreaseProductQuantity(cartId, quantity - 1);
  };

  const onChangeQuantity = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    updateProductQuantity(cartId, Number(value) || 1);
  };

  return (
    <styled.Container>
      <Button designType="square" disabled={quantity === QUANTITY.MIN} onClick={onClickMinusButton}>
        -
      </Button>
      <styled.CountInput value={quantity} onChange={onChangeQuantity} />
      <Button designType="square" disabled={quantity === QUANTITY.MAX} onClick={onClickPlusButton}>
        +
      </Button>
    </styled.Container>
  );
};
