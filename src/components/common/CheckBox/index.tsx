import Check from "../../icons/Check";
import * as S from "./CheckBox.styled";

interface CheckboxProps {
  isChecked: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const CheckBox = ({ children, isChecked, onClick }: CheckboxProps) => {
  function handleEnterKeyPress(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      onClick();
    }
  }
  return (
    <S.Label onClick={onClick} onKeyDown={handleEnterKeyPress}>
      <S.CheckBox isChecked={isChecked}>
        <S.Input type="checkbox" />
        <Check color={isChecked ? "#fff" : "#0000001a"} />
      </S.CheckBox>
      {children}
    </S.Label>
  );
};

export default CheckBox;
