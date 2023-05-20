import { useEffect, useState } from 'react';
import styled from 'styled-components';

import * as api from '../../api';
import { isNumeric } from '../../utils/validator';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartItemState, cartState } from '../../recoil/state';

interface Props {
  cartItemId: number;
  min?: number;
  max?: number;
  style?: React.CSSProperties;
}

export default function CounterInput({ cartItemId, min = 0, max, style }: Props) {
  const setCart = useSetRecoilState(cartState);
  const cartItem = useRecoilValue(cartItemState(cartItemId));
  const [count, setCount] = useState('');

  const getValidRangeNumber = (number: number) => {
    if (min > number) return min;
    if (max && max < number) return max;
    return number;
  };

  const setCountWithFetch = (quantity: number) => {
    const validQuantity = getValidRangeNumber(quantity);
    setCount(validQuantity.toString());

    if (validQuantity === 0) {
      api.deleteCartItem(cartItemId).then(api.getCart).then(setCart);
    } else {
      api.patchCartItemQuantity(cartItemId, validQuantity).then(api.getCart).then(setCart);
    }
  };

  const onChangeInput = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumeric(value)) {
      setCountWithFetch(Number(value));
    } else if (value === '') {
      setCount('');
    }
  };

  const onBlurInput = () => {
    if (count === '') setCountWithFetch(min);
  };

  const countUp = () => {
    setCountWithFetch(Number(count) + 1);
  };

  const countDown = () => {
    setCountWithFetch(Number(count) - 1);
  };

  useEffect(() => {
    if (cartItem) setCount(cartItem.quantity.toString());
  }, []);

  return (
    <Wrapper style={style}>
      <Input type="text" value={count} onChange={onChangeInput} onBlur={onBlurInput} />
      <CounterBox>
        <Counter onClick={countUp} disabled={Number(count) === max}>
          <img src="./arrowUp.svg" />
        </Counter>
        <Counter onClick={countDown} disabled={Number(count) === min}>
          <img src="./arrowDown.svg" />
        </Counter>
      </CounterBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;

  width: 64px;
  height: 28px;

  text-align: center;
  font-size: 12px;
`;

const Input = styled.input`
  width: 64%;
  height: 100%;
  border: 1px solid #dddddd;

  text-align: center;
  font-size: inherit;
  color: #333333;
`;

const CounterBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 36%;
  height: 100%;
`;

const Counter = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50%;
  border: 1px solid #dddddd;
  background: transparent;

  & > img {
    width: 48%;
    height: 32%;
  }

  &:disabled {
    background: rgba(0, 0, 0, 0.1);
    cursor: default;
  }

  &:disabled > img {
    visibility: hidden;
  }
`;
