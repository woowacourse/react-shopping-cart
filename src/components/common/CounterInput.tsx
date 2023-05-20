import { useEffect } from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import { cartItemState } from '../../recoil/state';
import useQuantityInput from '../../hooks/useQuantityInput';
import { isNaturalNumberString } from '../../utils/validator';

interface Props {
  cartItemId: number;
  min?: number;
  max?: number;
  style?: React.CSSProperties;
}

export default function CounterInput({ cartItemId, min = 0, max, style }: Props) {
  const cartItem = useRecoilValue(cartItemState(cartItemId));
  const [input, { setQuantityInput, setQuantityInputProxy }] = useQuantityInput(cartItemId);

  const getValidRange = (quantity: number) => {
    if (min > quantity) return min;
    if (max && max < quantity) return max;
    return quantity;
  };

  const onChangeInput = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaturalNumberString(value)) {
      setQuantityInputProxy(getValidRange(Number(value)));
    } else if (value === '') {
      setQuantityInput('');
    }
  };

  const onBlurInput = () => {
    if (input === '') setQuantityInputProxy(min);
  };

  const quantityUp = () => {
    setQuantityInputProxy(Number(input) + 1);
  };

  const quantityDown = () => {
    setQuantityInputProxy(Number(input) - 1);
  };

  useEffect(() => {
    if (cartItem) setQuantityInput(cartItem.quantity.toString());
  }, []);

  return (
    <Wrapper style={style}>
      <Input type="text" value={input} onChange={onChangeInput} onBlur={onBlurInput} />
      <CounterBox>
        <Counter onClick={quantityUp} disabled={Number(input) === max}>
          <img src="./arrowUp.svg" />
        </Counter>
        <Counter onClick={quantityDown} disabled={Number(input) === min}>
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
