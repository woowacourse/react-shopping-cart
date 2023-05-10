import { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { productsInCartState } from '../atom';
import Button from './common/Button';

interface Props {
  initCount: number;
  productId: number;
}

export default function Stepper({ initCount, productId }: Props) {
  const [count, setCount] = useState(initCount);
  const setProductsInCart = useSetRecoilState(productsInCartState);

  const increaseCount = () => {
    setCount((prev) => prev + 1);

    setProductsInCart((prev) => {
      return prev.map((productInCart) => {
        if (productInCart.id === productId)
          return { ...productInCart, quantity: productInCart.quantity + 1 };

        return productInCart;
      });
    });
  };

  const decreaseCount = () => {
    setCount((prev) => prev - 1);
    setProductsInCart((prev) => {
      return prev.map((productInCart) => {
        if (productInCart.id === productId)
          return { ...productInCart, quantity: productInCart.quantity - 1 };

        return productInCart;
      });
    });
  };

  const isMinCount = () => {
    if (count === 1) return true;

    return false;
  };

  const isMaxCount = () => {
    if (count === 99) return true;

    return false;
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!/^[0-9]*$/.test(target.value)) return;

    const value = Number(target.value);

    if (value < 1) setCount(1);
    else if (value > 99) setCount(99);
    else setCount(value);

    setProductsInCart((prev) => {
      return prev.map((productInCart) => {
        console.log(typeof productInCart);
        console.log(typeof productId);
        if (productInCart.id === productId) return { ...productInCart, quantity: value };

        return productInCart;
      });
    });
  };

  return (
    <Style.Container>
      <Button bgColor="primary" designType="square" disabled={isMinCount()} onClick={decreaseCount}>
        -
      </Button>
      <Style.CountInput value={count} onChange={handleChange} />
      <Button designType="square" disabled={isMaxCount()} onClick={increaseCount}>
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
