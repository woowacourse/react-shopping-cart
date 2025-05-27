import * as S from "./CheckBox.styled";

function CheckBox({ isChecked }: { isChecked: boolean }) {
  return (
    <S.CheckBoxWrapper>
      <S.Input type="checkbox" id="select-all" />
      <S.Label htmlFor="select-all">전체 선택</S.Label>
    </S.CheckBoxWrapper>
  );
}

export default CheckBox;
