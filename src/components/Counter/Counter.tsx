import { css, styled } from 'styled-components';
import { MinusIcon, PlusIcon } from '../../assets/icons';
import useCounter from './useCounter';
import { isNumber } from '../../utils/isNumber';
import type { ChangeEventHandler } from 'react';

export type CounterSize = 'medium' | 'small';

interface CounterProps {
  count: number;
  onChangeCount: (count: number) => void;
  size?: CounterSize;
}

const Counter = ({ count, onChangeCount, size = 'medium' }: CounterProps) => {
  const { increaseCount, decreaseCount, updateCount } = useCounter(
    count,
    onChangeCount,
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isNumber(e.target.value)) return;

    updateCount(Number(e.target.value));
  };

  return (
    <CounterContainer size={size}>
      <CounterButton onClick={decreaseCount}>
        <MinusIcon />
      </CounterButton>
      <Input type="text" maxLength={2} value={count} onChange={handleChange} />
      <CounterButton onClick={increaseCount}>
        <PlusIcon />
      </CounterButton>
    </CounterContainer>
  );
};

const CounterContainer = styled.span<{ size: CounterSize }>`
  display: flex;

  border: 1px solid #dddddd;

  ${({ size }) =>
    (size === 'medium' &&
      css`
        width: 120px;
        height: 42px;

        & > * {
          width: 40px;
          height: 40px;

          font-size: 24px;
        }
      `) ||
    (size === 'small' &&
      css`
        width: 92px;

        & > * {
          width: 30px;
          height: 30px;

          font-size: 16px;
        }
      `)}
`;

const Input = styled.input`
  border: none;

  font-weight: 400;
  color: #333;

  text-align: center;
`;

const CounterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #fff;
  border: none;

  cursor: pointer;
`;

export default Counter;
