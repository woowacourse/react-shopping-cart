import Uncheck from "../icons/Uncheck";
import * as S from "./Checkbox.styles";

interface CheckboxProps {
  checked: boolean;
  onClick?: () => void;
}

export default function Checkbox({ checked, onClick }: CheckboxProps) {
  return (
    <S.CheckboxWrapper checked={checked} onClick={onClick}>
      <Uncheck />
    </S.CheckboxWrapper>
  );
}
