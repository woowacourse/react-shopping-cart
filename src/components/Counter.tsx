import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { itemQuantitySelector } from "../recoil/selector";
import { itemsState } from "../recoil/atom";
import { ItemType } from "../types/domain";
import { MAX_QUANTITY, MIN_QUANTITY } from "../constants";

interface CounterProps {
  itemId: number;
}

const Counter = ({ itemId }: CounterProps) => {
  const setitemQuantity = useSetRecoilState(itemQuantitySelector);
  const items = useRecoilValue(itemsState);
  const [quantity, setQuantity] = useState(
    items.find((item: ItemType) => item.id === itemId).quantity
  );

  const handleQuantityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleQuantityBlured = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quantity === "" || Number(quantity) < MIN_QUANTITY)
      e.target.value = MIN_QUANTITY.toString();
    if (Number(quantity) > MAX_QUANTITY) e.target.value = MAX_QUANTITY.toString();
    setitemQuantity({ id: itemId, quantity: e.target.value });
  };

  const increaseItemQuantity = () => {
    setitemQuantity({ id: itemId, quantity: Number(quantity) + 1 });
  };

  const decreaseItemQuantity = () => {
    setitemQuantity({ id: itemId, quantity: Number(quantity) - 1 });
  };

  return (
    <CounterWrapper>
      <CountBox
        type="number"
        value={quantity}
        onChange={handleQuantityChanged}
        onBlur={handleQuantityBlured}
      />
      <ArrowWrapper>
        <ArrowBox onClick={increaseItemQuantity}>▾</ArrowBox>
        <ArrowBox onClick={decreaseItemQuantity}>▾</ArrowBox>
      </ArrowWrapper>
    </CounterWrapper>
  );
};

const CounterWrapper = styled.div`
  display: flex;
`;

const CountBox = styled.input`
  width: 41.6px;
  height: 28px;
  border: 1px solid #dddddd;
  text-align: center;

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ArrowBox = styled.button`
  width: 23px;
  height: 14px;
  border: 1px solid #dddddd;
  background: transparent;
  font-size: 5px;
`;

const ArrowWrapper = styled.div`
  display: flex;
  flex-direction: column;

  :active {
    opacity: 50%;
  }

  & > :first-child {
    transform: scaleY(-1);
  }
`;

export default Counter;
