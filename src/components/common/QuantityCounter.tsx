import { forwardRef } from "react";
import styled from "styled-components";

import type { CounterAction } from "../../type/counter";
import { DownButtonIc, UpButtonIc } from "../../asset";
import { ACTION_DECREASE, ACTION_INCREASE } from "../../constants/counter";
import { ERROR } from "../../constants/error";
import { useRefTypeGuard } from "../../hooks/useRefTypeGuard";
import { fillBlankInput, validateNumberRange } from "../../utils/validation";
import { useState } from "react";
import { patchProductCount } from "../../api/cart";
import { useEffect } from "react";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { cartData } from "../../atoms/cartState";

interface QuantityCounterProps {
  count: number;
  getCount: any;
  increaseQuantity: any;
  decreaseQuantity: any;
  id?: number;
}
export function QuantityCounter(props: QuantityCounterProps) {
  const { count, getCount, increaseQuantity, decreaseQuantity, id } = props;
  const refresh = useRecoilRefresher_UNSTABLE(cartData);

  function handleChange(e: any) {
    validateNumberRange(e);
    id ? getCount(+e.target.value, id) : getCount(+e.target.value);
  }

  useEffect(() => {
    id && patchProductCount(id, count);
    refresh();
  }, [count]);

  return (
    <QuantityCounterContainer>
      <QuantityInput
        onChange={handleChange}
        onBlur={fillBlankInput}
        value={count}
      />
      <ButtonWrapper>
        <CountButton
          onClick={() => (id ? increaseQuantity(id) : increaseQuantity())}>
          <UpButtonIc />
        </CountButton>
        <CountButton
          onClick={() => (id ? decreaseQuantity(id) : decreaseQuantity())}>
          <DownButtonIc />
        </CountButton>
      </ButtonWrapper>
    </QuantityCounterContainer>
  );
}

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
