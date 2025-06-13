import * as S from "./CheckBox.styled";

function CheckBox({
  isChecked,
  text,
  disabled = false,
  onClick,
}: {
  isChecked: boolean;
  text?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <S.CheckBoxWrapper>
      <S.Input
        checked={isChecked}
        disabled={disabled}
        type="checkbox"
        id="select-all"
        onChange={!disabled ? onClick : undefined}
      />
      {text && <S.Label htmlFor="select-all">{text}</S.Label>}
    </S.CheckBoxWrapper>
  );
}

export default CheckBox;
