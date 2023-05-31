import styled from "styled-components";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import useQuantityUpdater from "../../hooks/useQuantity";
import type { ProductQuantityInputProps } from "../../types";

const RectangleQuantityInput = ({
  initialValue,
  minValue,
  productId,
  onChange,
  step = 1,
}: ProductQuantityInputProps) => {
  const { inputValue, updateInputValue, incrementInputValue } =
    useQuantityUpdater({
      productId,
      initialValue,
      minValue,
      onChange,
    });

  return (
    <Container>
      <Input value={inputValue} onChange={updateInputValue} />
      <IncreaseButton type="button" onClick={() => incrementInputValue(step)}>
        <ArrowUpIcon />
      </IncreaseButton>
      <DecreaseButton type="button" onClick={() => incrementInputValue(-step)}>
        <ArrowDownIcon />
      </DecreaseButton>
    </Container>
  );
};

const colors = {
  pureWhite: "#fff",
  gold: "#ffdf7e",
  darkGray: "#222",
  pureBlack: "#000",
};

const Container = styled.div`
  display: grid;
  width: 114px;
  height: 60px;
  text-align: center;
  grid-template-columns: 73px 41px;
  grid-template-rows: 29px 29px;
  grid-template-areas:
    "input upButton"
    "input downButton";

  & * {
    background-color: transparent;
    color: ${colors.gold};
  }
`;

const Input = styled.input`
  border: 1px solid ${colors.gold};
  grid-area: input;
  color: ${colors.gold};
  font-size: 24px;
  font-family: "Rubik";
  text-align: center;
`;

const IncreaseButton = styled.button`
  border: 1px solid ${colors.gold};
  grid-area: upButton;
`;

const DecreaseButton = styled.button`
  border: 1px solid ${colors.gold};
  grid-area: downButton;
`;

const ArrowUpIcon = styled(AiFillCaretUp)``;

const ArrowDownIcon = styled(AiFillCaretDown)``;

export default RectangleQuantityInput;
