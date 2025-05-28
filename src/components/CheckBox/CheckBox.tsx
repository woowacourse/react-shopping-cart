import * as S from "./CheckBox.styled";

function CheckBox({ isChecked, text }: { isChecked: boolean; text?: string }) {
  return (
    <S.CheckBoxWrapper>
      <S.Input checked={isChecked} type="checkbox" id="select-all" />
      {text && <S.Label htmlFor="select-all">{text}</S.Label>}
    </S.CheckBoxWrapper>
  );
}

export default CheckBox;
