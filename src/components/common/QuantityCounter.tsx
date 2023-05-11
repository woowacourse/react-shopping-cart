import { forwardRef } from "react";
import styled from "styled-components";
import { DownButtonIc, UpButtonIc } from "../../asset";
import { ACTION_DECREASE, ACTION_INCREASE } from "../../constants/counter";
import { CounterAction } from "../../type/counter";
import { isForwardedRef, isRefCurrent } from "../../utils/refTypeGuard";
import { validateNumberRange } from "../../utils/validation";

const unknownCountAction = (action: never): never => {
  throw new Error("잘못된 action 이 전달되었습니다.");
};

const changeCount = (current: HTMLInputElement, action: CounterAction) => {
  const prevValue = +current.value;
  switch (action) {
    case ACTION_INCREASE:
      current.value = (prevValue + 1).toString();
      break;
    case ACTION_DECREASE:
      if (prevValue < 1) return;
      current.value = (prevValue - 1).toString();
      break;
    default:
      unknownCountAction(action);
  }
};

const QuantityCounter = forwardRef<HTMLInputElement>(function QuantityCounter(
  props,
  quantityRef
) {
  const increaseQuantity = () => {
    if (!isForwardedRef<HTMLInputElement>(quantityRef)) return;
    if (!isRefCurrent<HTMLInputElement>(quantityRef.current)) return;

    changeCount(quantityRef.current, "INCREASE");
  };

  const decreaseQuantity = () => {
    if (!isForwardedRef<HTMLInputElement>(quantityRef)) return;
    if (!isRefCurrent<HTMLInputElement>(quantityRef.current)) return;

    changeCount(quantityRef.current, "DECREASE");
  };
  return (
    <QuantityCounterContainer>
      <QuantityInput
        ref={quantityRef}
        onChange={validateNumberRange}
        defaultValue="1"
      />
      <ButtonWrapper>
        <CountButton onClick={increaseQuantity}>
          <UpButtonIc />
        </CountButton>
        <CountButton onClick={decreaseQuantity}>
          <DownButtonIc />
        </CountButton>
      </ButtonWrapper>
    </QuantityCounterContainer>
  );
});

export default QuantityCounter;

const QuantityCounterContainer = styled.div`
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
