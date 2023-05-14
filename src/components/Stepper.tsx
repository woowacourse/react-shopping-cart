import { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { useCart } from '../hooks/useCart';
import { isNumeric } from '../utils';
import Button from './common/Button';

interface Props {
  initCount?: number;
  productId: number;
}

export default function Stepper({ productId }: Props) {
  const {
    findProductInCart,
    updateProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useCart();

  const count = findProductInCart(productId).quantity;

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!isNumeric(value)) return;

    updateProductQuantity(productId, Number(value));
  };

  const onClickPlusButton = () => {
    if (count === 99) return;

    increaseProductQuantity(productId);
  };

  const onClickMinusButton = () => {
    if (count === 1) return;

    decreaseProductQuantity(productId);
  };

  return (
    <Style.Container>
      <Button
        bgColor="primary"
        designType="square"
        disabled={count === 1}
        onClick={onClickMinusButton}
      >
        -
      </Button>
      <Style.CountInput value={count} onChange={handleChange} />
      <Button designType="square" disabled={count === 99} onClick={onClickPlusButton}>
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
