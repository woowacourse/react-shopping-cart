import { ChangeEventHandler } from 'react';
import { css, styled } from 'styled-components';
import { MinusIcon, PlusIcon } from '../../assets/icons';

export type CounterSize = 'medium' | 'small';

interface CounterProps {
  count: number;
  onChangeCount: (count: number) => void;
  size?: CounterSize;
}

const Counter = ({ count, onChangeCount, size = 'medium' }: CounterProps) => {
  const increaseCount = () => {
    if (count >= 99) return;

    onChangeCount(count + 1);
  };

  const decreaseCount = () => {
    if (count <= 0) return;

    onChangeCount(count - 1);
  };

  const handleCountChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;

    if (!isNumber(value)) return;

    onChangeCount(Number(value));
  };

  const isNumber = (value: string) => {
    const regex = /^\d*$/;
    return regex.test(value);
  };

  return (
    <CounterContainer size={size}>
      <CounterButton onClick={decreaseCount}>
        <MinusIcon size={size} />
      </CounterButton>
      <Input
        type="text"
        maxLength={2}
        value={count}
        onChange={handleCountChange}
      />
      <CounterButton onClick={increaseCount}>
        <PlusIcon size={size} />
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

        & > * {
          width: 40px;
          height: 40px;

          font-size: 24px;
        }
      `) ||
    (size === 'small' &&
      css`
        width: 90px;

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
