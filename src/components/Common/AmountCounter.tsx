import styled from 'styled-components';

import ArrowUpIcon from '../../assets/ArrowUpIcon';
import ArrowDownIcon from '../../assets/ArrowDownIcon';

interface AmountCounterProps {
  count: number;
  addCount: () => void;
  subtractCount: () => void;
}

const AmountCounter = ({
  count,
  addCount,
  subtractCount,
}: AmountCounterProps) => {
  return (
    <InputGroup>
      <CounterInput type='number' value={count} readOnly />
      <CountBtnContainer>
        <CountBtn onClick={addCount}>
          <ArrowUpIcon />
        </CountBtn>
        <CountBtn onClick={subtractCount}>
          <ArrowDownIcon />
        </CountBtn>
      </CountBtnContainer>
    </InputGroup>
  );
};

const InputGroup = styled.div`
  display: flex;
  height: 28px;
`;

const CounterInput = styled.input`
  width: 42px;
  border: 1px solid var(--gray-100);
  text-align: center;
  outline: none;

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

const CountBtn = styled.button`
  width: 24px;
  height: 14px;
  border: 1px solid var(--gray-100);
  flex-wrap: 1;
`;

export default AmountCounter;
