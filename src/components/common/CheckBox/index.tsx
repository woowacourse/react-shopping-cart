import Check from "../../icons/Check";
import * as S from "./CheckBox.styled";

interface CheckboxProps {
  isChecked: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const CheckBox = ({ children, isChecked, onClick, disabled }: CheckboxProps) => {
  return (
    <S.Label onClick={onClick}>
      <S.CheckBox isChecked={isChecked}>
        <S.Input type="checkbox" disabled={disabled ?? false} />
        <Check color={isChecked ? "#fff" : "#0000001a"} />
      </S.CheckBox>
      {children}
    </S.Label>
  );
};

export default CheckBox;
