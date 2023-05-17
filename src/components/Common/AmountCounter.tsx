import styled from 'styled-components';

import ArrowUpIcon from '../../assets/ArrowUpIcon';
import ArrowDownIcon from '../../assets/ArrowDownIcon';

interface AmountCounterProps {
  width?: number;
  height?: number;
  buttonWidth?: number;
  count: number;
  addCount: () => void;
  subtractCount: () => void;
}

const AmountCounter = ({
  width = 42,
  height = 28,
  buttonWidth = 24,
  count,
  addCount,
  subtractCount,
}: AmountCounterProps) => {
  return (
    <InputGroup height={height}>
      <CounterInput type='number' value={count} readOnly width={width} />
      <CountBtnContainer>
        <CountBtn buttonWidth={buttonWidth} onClick={addCount}>
          <ArrowUpIcon />
        </CountBtn>
        <CountBtn buttonWidth={buttonWidth} onClick={subtractCount}>
          <ArrowDownIcon />
        </CountBtn>
      </CountBtnContainer>
    </InputGroup>
  );
};

const InputGroup = styled.div<{ height: number }>`
  display: flex;
  height: ${({ height }) => height}px;
`;

const CounterInput = styled.input<{ width: number }>`
  width: ${({ width }) => width}px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  text-align: center;
  outline: none;
  font-size: ${({ width }) => width - 37}px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }
`;

const CountBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CountBtn = styled.button<{ buttonWidth: number }>`
  width: ${({ buttonWidth }) => buttonWidth}px;
  height: ${({ buttonWidth }) => buttonWidth - 10}px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  flex-wrap: 1;
`;

export default AmountCounter;
