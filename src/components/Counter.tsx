import React from "react";
import styled from "styled-components";
import { useQuantity } from "../hooks/useQuantity";

interface CounterProps {
  itemId: number;
  deleteable: boolean;
}

export const Counter = ({ itemId, deleteable }: CounterProps) => {
  const {
    quantity,
    setNewQuantity,
    handleQuantityChanged,
    handleQuantityBlured,
  } = useQuantity(itemId);

  const handleCountInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement) || e.key !== "Enter") return;
    e.target.blur();
  };

  const handleUpArrowBox = () => {
    setNewQuantity(Number(quantity) + 1);
  };

  const handleDownArrowBox = async () => {
    setNewQuantity(Number(quantity) - 1);
  };

  return (
    <Wrapper>
      <CountInput
        type="number"
        value={quantity}
        onChange={handleQuantityChanged}
        onKeyDown={handleCountInputKey}
        onBlur={handleQuantityBlured}
        placeholder="수량"
      />
      <ArrowBoxContainer>
        <ArrowBox onClick={handleUpArrowBox}>▾</ArrowBox>
        <ArrowBox
          onClick={handleDownArrowBox}
          disabled={!deleteable && quantity === "1"}
        >
          ▾
        </ArrowBox>
      </ArrowBoxContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const CountInput = styled.input`
  width: 41px;
  height: 28px;

  border: 1px solid var(--light-gray);
  text-align: center;

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::placeholder {
    font-size: 11px;
  }
`;

const ArrowBoxContainer = styled.div`
  display: flex;
  flex-direction: column;

  :active {
    opacity: 50%;
  }

  & > :first-child {
    transform: scaleY(-1);
  }
`;

const ArrowBox = styled.button`
  width: 23px;
  height: 14px;

  border: 1px solid var(--light-gray);
  background: transparent;

  font-size: 5px;
`;
