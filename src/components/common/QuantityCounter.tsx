import styled from 'styled-components';

import { DownButtonIc, UpButtonIc } from '../../asset';
import {
  ACTION_CHANGE,
  ACTION_DECREASE,
  ACTION_INCREASE,
} from '../../constants/counter';
import { CountAction, CountState } from '../../type/counter';
import React from 'react';

interface QuantityCounterProps {
  count: CountState;
  setCount: React.Dispatch<CountAction>;
}

export default function QuantityCounter({
  count,
  setCount,
}: QuantityCounterProps) {
  return (
    <QuantityCounterContainer>
      <QuantityCounterWrapper>
        <QuantityInput
          value={count.value}
          onChange={(e) =>
            setCount({ action: ACTION_CHANGE, payload: e.target.value })
          }
        />
        <ButtonWrapper>
          <CountButton
            onClick={() => setCount({ action: ACTION_INCREASE, payload: '' })}
          >
            <UpButtonIc />
          </CountButton>
          <CountButton
            onClick={() => setCount({ action: ACTION_DECREASE, payload: '' })}
          >
            <DownButtonIc />
          </CountButton>
        </ButtonWrapper>
      </QuantityCounterWrapper>
      {count.status === 'INVALID' && (
        <ErrorBox>⚠️ 장바구니에 담을 수량을 1개 이상 적어주세요.</ErrorBox>
      )}
    </QuantityCounterContainer>
  );
}

const QuantityCounterContainer = styled.div`
  position: relative;
`;

const QuantityCounterWrapper = styled.div`
  display: flex;
  width: 6.4rem;
  height: 4.3rem;
`;

const QuantityInput = styled.input`
  width: 4rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.gray100};
  outline: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 2.4rem;
`;

const CountButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50%;

  background-color: transparent;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray100};
`;

const ErrorBox = styled.div`
  position: absolute;
  top: 5rem;
  width: 15rem;
  padding: 1rem;
  background-color: white;
  ${({ theme }) => theme.fonts.warringMessage}
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  box-shadow: 2px 2px ${({ theme }) => theme.colors.gray200};
`;
