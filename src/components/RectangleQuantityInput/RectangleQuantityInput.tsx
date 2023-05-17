import styled from "styled-components";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import useQuantityUpdater from "../../hooks/useQuantityUpdater";
import type { ProductQuantityInputProps } from "../../types";

const RectangleQuantityInput = ({
  initialValue,
  productId,
  step = 1,
  notifyFunction,
}: ProductQuantityInputProps) => {
  const { inputValue, setIsFocused, updateInputValue, incrementInputValue } =
    useQuantityUpdater({
      productId: productId,
      initialValue: initialValue,
      notifyFunction: notifyFunction,
    });

  return (
    <Container>
      <Input
        value={inputValue}
        onChange={updateInputValue}
        onBlur={() => setIsFocused(false)}
      />
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
