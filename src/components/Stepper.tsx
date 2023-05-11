import { ChangeEvent, MouseEvent } from 'react';
import { styled } from 'styled-components';
import { useCart } from '../hooks/useCart';
import { useCountInput } from '../hooks/useCountInput';
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

  const { count, setCount, increaseCount, decreaseCount } = useCountInput(
    findProductInCart(productId)?.quantity
  );

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setCount(value);
    updateProductQuantity(productId, Number(value));
  };

  const onClickButton = ({ currentTarget: { id } }: MouseEvent<HTMLButtonElement>) => {
    if (id === 'increase') {
      increaseCount();
      increaseProductQuantity(productId);

      return;
    }

    decreaseCount();
    decreaseProductQuantity(productId);
  };

  return (
    <Style.Container>
      <Button
        id="decrease"
        bgColor="primary"
        designType="square"
        disabled={count === 1}
        onClick={onClickButton}
      >
        -
      </Button>
      <Style.CountInput value={count} onChange={handleChange} />
      <Button id="increase" designType="square" disabled={count === 99} onClick={onClickButton}>
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
