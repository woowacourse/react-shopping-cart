import { ChangeEvent } from 'react';

import { styled } from 'styled-components';

import { useUpdateCart } from '../hooks/useUpdateCart';

import { Button } from './common/Button';

import { QUANTITY } from '../constants';

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
    <Style.Container>
      <Button designType="square" disabled={quantity === QUANTITY.MIN} onClick={onClickMinusButton}>
        -
      </Button>
      <Style.CountInput value={quantity} onChange={onChangeQuantity} />
      <Button designType="square" disabled={quantity === QUANTITY.MAX} onClick={onClickPlusButton}>
        +
      </Button>
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    display: flex;

    width: 80px;
    height: 30px;
    background-color: var(--grey-100);
    border: 1px solid var(--grey-200);
    border-radius: 7px;

    & > * {
      flex: 1;
    }
  `,

  CountInput: styled.input`
    border: none;
    width: 0;

    text-align: center;

    &:focus {
      outline: none;
    }
  `,
};
