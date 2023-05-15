import { forwardRef, useState } from 'react';
import styled from 'styled-components';

import type { CounterAction } from '../../type/counter';
import { DownButtonIc, UpButtonIc } from '../../asset';
import { ACTION_DECREASE, ACTION_INCREASE } from '../../constants/counter';
import { ERROR } from '../../constants/error';
import { isForwardedRef, isRefCurrent } from '../../utils/refTypeGuard';
import {
  fillBlankInput,
  handleInvalidQuantity,
  isZeroValue,
} from '../../utils/validation';

const unknownCountAction = (action: never): never => {
  throw new Error(ERROR.INVALID_ACTION);
};

const changeCount = (current: HTMLInputElement, action: CounterAction) => {
  const prevValue = +current.value;
  switch (action) {
    case ACTION_INCREASE:
      current.value = (prevValue + 1).toString();
      break;
    case ACTION_DECREASE:
      if (prevValue < 2) return;
      current.value = (prevValue - 1).toString();
      break;
    default:
      unknownCountAction(action);
  }
};

const QuantityCounter = forwardRef<HTMLInputElement>(function (_, quantityRef) {
  const [isInvalid, setIsInvalid] = useState(false);
  const changeQuantityByAction = (action: CounterAction) => {
    if (!isForwardedRef<HTMLInputElement>(quantityRef)) return;
    if (!isRefCurrent<HTMLInputElement>(quantityRef.current)) return;

    changeCount(quantityRef.current, action);
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInvalidQuantity(e);
    setIsInvalid(isZeroValue(e.target.value));
  };
  return (
    <QuantityCounterContainer>
      <QuantityCounterWrapper>
        <QuantityInput
          ref={quantityRef}
          onChange={onChangeInput}
          defaultValue='1'
          onBlur={fillBlankInput}
        />
        <ButtonWrapper>
          <CountButton onClick={() => changeQuantityByAction(ACTION_INCREASE)}>
            <UpButtonIc />
          </CountButton>
          <CountButton onClick={() => changeQuantityByAction(ACTION_DECREASE)}>
            <DownButtonIc />
          </CountButton>
        </ButtonWrapper>
      </QuantityCounterWrapper>
      {isInvalid && (
        <ErrorBox>⚠️ 장바구니에 담을 수량을 1개 이상 적어주세요.</ErrorBox>
      )}
    </QuantityCounterContainer>
  );
});

export default QuantityCounter;

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
