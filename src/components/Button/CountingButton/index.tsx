import styled from "styled-components";
import IMAGES from "../../../assets/images/Images";

type ButtonType = "increase" | "decrease";

interface CountingButton {
  type: ButtonType;
  onClick: () => void;
}

const CountingButton = ({ type, onClick }: CountingButton) => {
  return (
    <Button onClick={onClick}>
      <Image alt="countingButton" src={type === "increase" ? IMAGES.plusButton : IMAGES.minusButton}></Image>
    </Button>
  );
};

export default CountingButton;

const Button = styled.button`
  height: 24px;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  outline: none;

  &:focus {
    border: none;
    outline: none;
  }

  &:active {
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
  border: 1px solid;
`;
