import styled from 'styled-components';

import { isNumeric } from '../../utils/validator';
import { useEffect } from 'react';

interface Props {
  count: string;
  setCount: (value: string) => void;
  max?: number;
}

export default function CounterInput({ count, setCount, max }: Props) {
  const onChangeInput = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (value === '') {
      setCount('');
    } else if (isNumeric(value)) {
      setCount(value);
    }
  };

  const onBlurInput = () => {
    if (count === '') setCount('0');
  };

  const onCountUp = () => {
    setCount(String(Number(count) + 1));
  };

  const onCountDown = () => {
    setCount(String(Number(count) - 1));
  };

  return (
    <Wrapper>
      <Input type="text" value={count} onChange={onChangeInput} onBlur={onBlurInput} />
      <CounterBox>
        <Counter onClick={onCountUp}>
          <img src="./arrowUp.svg" />
        </Counter>
        <Counter onClick={onCountDown} disabled={count === '0'}>
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
`;

const Input = styled.input`
  width: 64%;
  height: 100%;
  border: 1px solid #dddddd;

  text-align: center;
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

  cursor: pointer;

  & > img {
    width: 48%;
    height: 32%;
    color: #333333;
  }
`;
