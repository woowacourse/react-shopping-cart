import * as S from "./CheckBox.styled";

function CheckBox({
  isChecked,
  text,
  onClick,
}: {
  isChecked: boolean;
  text?: string;
  onClick?: () => void;
}) {
  
  return (
    <S.CheckBoxWrapper>
      <S.Input
        checked={isChecked}
        type="checkbox"
        id="select-all"
        onChange={onClick}
      />
      {text && <S.Label htmlFor="select-all">{text}</S.Label>}
    </S.CheckBoxWrapper>
  );
}

export default CheckBox;
