import { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { QUANTITY } from '../constants';
import { useCart } from '../hooks/useCart';
import { isNumeric } from '../utils';
import Button from './common/Button';

interface Props {
  productId: number;
}

export default function Stepper({ productId }: Props) {
  const {
    findProductInCart,
    updateProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useCart();

  const count = findProductInCart(productId).quantity || 1;

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!isNumeric(value)) return;

    updateProductQuantity(productId, Number(value));
  };

  const onClickPlusButton = () => {
    if (count === QUANTITY.MAX) return;

    increaseProductQuantity(productId);
  };

  const onClickMinusButton = () => {
    if (count === QUANTITY.MIN) return;

    decreaseProductQuantity(productId);
  };

  return (
    <Style.Container>
      <Button designType="square" disabled={count === QUANTITY.MIN} onClick={onClickMinusButton}>
        -
      </Button>
      <Style.CountInput value={count} onChange={handleChange} />
      <Button designType="square" disabled={count === QUANTITY.MAX} onClick={onClickPlusButton}>
        +
      </Button>
    </Style.Container>
  );
}

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
