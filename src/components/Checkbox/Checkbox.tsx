import Uncheck from "../icons/Uncheck";
import * as S from "./Checkbox.styles";

interface CheckboxProps {
  checked: boolean;
  onClick?: () => void;
}

export default function Checkbox({ checked, onClick }: CheckboxProps) {
  return (
    <S.CheckboxWrapper checked={checked}>
      <S.CheckboxInput
        type="checkbox"
        checked={checked}
        onChange={onClick}
        aria-checked={checked}
      />
      {checked ? <Uncheck /> : null}
    </S.CheckboxWrapper>
  );
}
