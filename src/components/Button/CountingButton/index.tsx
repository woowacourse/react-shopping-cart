import styled from "styled-components";
import IMAGES from "../../../assets/images/Images";

type ButtonType = "increase" | "decrease";

const imageSrc: Record<ButtonType, string> = {
  increase: IMAGES.plusButton,
  decrease: IMAGES.minusButton,
};

interface CountingButton {
  type: ButtonType;
  onClick: () => void;
}

const CountingButton = ({ type, onClick }: CountingButton) => {
  return (
    <Button onClick={onClick}>
      <Image alt="countingButton" src={imageSrc[type]}></Image>
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

  &:active {
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
`;
