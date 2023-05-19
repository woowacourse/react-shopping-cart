import { ChangeEvent } from 'react';
import { styled } from 'styled-components';

import { useCart } from '../hooks/useCart';

import { Button } from './common/Button';

import { QUANTITY } from '../constants';

interface Props {
  productId: number;
  quantity: number;
}

export const Stepper = ({ productId, quantity }: Props) => {
  const { increaseProductQuantity, decreaseProductQuantity, updateProductQuantity } = useCart();

  const onClickPlusButton = () => {
    if (quantity === QUANTITY.MAX) return;

    increaseProductQuantity(productId);
  };

  const onClickMinusButton = () => {
    if (quantity === QUANTITY.MIN) return;

    decreaseProductQuantity(productId);
  };

  const onChangeQuantity = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    updateProductQuantity(productId, Number(value) || 1);
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
