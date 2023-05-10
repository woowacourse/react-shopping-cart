import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { itemCountSelector } from "../recoil/selector";
import { itemsState } from "../recoil/atom";

interface CounterProps {
  itemId: number;
}

const Counter = ({ itemId }: CounterProps) => {
  const setItemCount = useSetRecoilState(itemCountSelector);
  const items = useRecoilValue(itemsState);
  const [quantity, setQuantity] = useState(items[itemId - 1].count);

  const handleCountChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleCountBlured = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quantity === "" || Number(quantity) < 0) e.target.value = "0";
    if (Number(quantity) > 99) e.target.value = "99";
    setItemCount({ id: itemId, count: e.target.value });
  };

  const increaseItemCount = () => {
    setItemCount({ id: itemId, count: Number(quantity) + 1 });
  };

  const decreaseItemCount = () => {
    setItemCount({ id: itemId, count: Number(quantity) - 1 });
  };

  return (
    <CounterWrapper>
      <CountBox
        type="number"
        value={quantity}
        onChange={handleCountChanged}
        onBlur={handleCountBlured}
      />
      <ArrowWrapper>
        <ArrowBox onClick={increaseItemCount}>▾</ArrowBox>
        <ArrowBox onClick={decreaseItemCount}>▾</ArrowBox>
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
