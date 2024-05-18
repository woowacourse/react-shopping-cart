import styled from "styled-components";
import IMAGES from "../../../../assets/images/Images";

const BUTTON_TYPE = {
  increase: "increase",
  decrease: "decrease",
} as const;

const imageSrc = {
  [BUTTON_TYPE.increase]: IMAGES.plusButton,
  [BUTTON_TYPE.decrease]: IMAGES.minusButton,
};

type ButtonType = keyof typeof BUTTON_TYPE;

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
