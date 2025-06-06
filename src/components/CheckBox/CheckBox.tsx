import { useId } from "react";
import * as S from "./CheckBox.styled";

function CheckBox({
  isChecked,
  text,
  onChange,
}: {
  isChecked: boolean;
  text?: string;
  onChange?: () => void;
}) {
  const id = useId();

  return (
    <S.CheckBoxWrapper>
      <S.Input
        checked={isChecked}
        type="checkbox"
        id={id}
        onChange={onChange}
      />
      {text && <S.Label htmlFor={id}>{text}</S.Label>}
    </S.CheckBoxWrapper>
  );
}

export default CheckBox;
