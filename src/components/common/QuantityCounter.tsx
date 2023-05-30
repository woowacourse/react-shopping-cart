import styled from "styled-components";

import { DownButtonIc, UpButtonIc } from "../../asset";
import { fillBlankInput, validateNumberRange } from "../../utils/validation";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

interface QuantityCounterProps {
  count: number;
  getCount: (count: number, id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  id: number;
}
export default function QuantityCounter(props: QuantityCounterProps) {
  const { count, getCount, increaseQuantity, decreaseQuantity, id } = props;
  const { updateProductCount } = useFetch();

  useEffect(() => {
    updateProductCount({ id, quantity: count });
  }, [count]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    validateNumberRange(e);
    getCount(+e.target.value, id);
  }

  return (
    <QuantityCounterContainer>
      <QuantityInput
        onChange={handleChange}
        onBlur={fillBlankInput}
        value={count}
      />
      <ButtonWrapper>
        <CountButton onClick={() => increaseQuantity(id)}>
          <UpButtonIc />
        </CountButton>
        <CountButton onClick={() => decreaseQuantity(id)}>
          <DownButtonIc />
        </CountButton>
      </ButtonWrapper>
    </QuantityCounterContainer>
  );
}

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
