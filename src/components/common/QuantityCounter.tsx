import { forwardRef } from "react";
import styled from "styled-components";

const QuantityCounter = forwardRef<HTMLInputElement>(function QuantityCounter(
  props,
  quantityRef
) {
  const validateNumberRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rule = /[^0-9]+/g;
    e.target.value = e.target.value.replaceAll(rule, "");
  };
  return (
    <QuantityCounterContainer>
      <QuantityInput ref={quantityRef} onChange={validateNumberRange} />
      <ButtonWrapper>
        <IncreaseButton>▴</IncreaseButton>
        <DecreaseButton>▾</DecreaseButton>
      </ButtonWrapper>
    </QuantityCounterContainer>
  );
});

export default QuantityCounter;

const QuantityCounterContainer = styled.div`
  display: flex;

  width: 6.4rem;
  height: 2.8rem;
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

const IncreaseButton = styled.button`
  height: 1.4rem;

  background-color: transparent;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray100};
`;

const DecreaseButton = styled.button`
  height: 1.4rem;

  background-color: transparent;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray100};
`;
