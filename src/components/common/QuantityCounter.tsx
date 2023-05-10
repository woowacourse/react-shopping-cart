import { forwardRef } from "react";
import styled from "styled-components";
import { DownButtonIc, UpButtonIc } from "../../asset";

const QuantityCounter = forwardRef<HTMLInputElement>(function QuantityCounter(
  props,
  quantityRef
) {
  const validateNumberRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rule = /[^0-9]+/g;
    e.target.value = e.target.value.replaceAll(rule, "");
  };

  const increaseQuantity = () => {
    if (
      typeof quantityRef === "function" ||
      !quantityRef ||
      !quantityRef.current
    )
      return;
    const prevValue = +quantityRef.current.value;
    quantityRef.current.value = (prevValue + 1).toString();
  };

  const decreaseQuantity = () => {
    if (
      typeof quantityRef === "function" ||
      !quantityRef ||
      !quantityRef.current
    )
      return;
    if (+quantityRef.current.value < 1) return;
    const prevValue = +quantityRef.current.value;
    quantityRef.current.value = (prevValue - 1).toString();
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
