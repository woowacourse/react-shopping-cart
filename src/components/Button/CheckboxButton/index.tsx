import styled from "styled-components";
import IMAGES from "../../../assets/images/Images";

interface CheckboxButtonProps {
  isChecked: boolean;
  onClick: () => void;
}

const CheckboxButton = ({ isChecked, onClick }: CheckboxButtonProps) => {
  return (
    <Button onClick={onClick}>
      <Image alt="checkbox" src={isChecked ? IMAGES.checkedButton : IMAGES.uncheckedButton}></Image>
    </Button>
  );
};

export default CheckboxButton;

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
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
  border: 1px solid;
`;
