import * as S from "./AllCheckBox.styled";
import CheckBox from "@/shared/components/CheckBox/CheckBox";

type AllCheckBoxProps = {
  isAllSelected: boolean;
  toggleAllSelection: () => void;
};

export default function AllCheckBox({
  isAllSelected,
  toggleAllSelection,
}: AllCheckBoxProps) {
  return (
    <S.AllCheckBox>
      <CheckBox
        isChecked={isAllSelected}
        onClick={toggleAllSelection}
        aria-label="전체 선택"
      >
        <S.Text>전체 선택</S.Text>
      </CheckBox>
    </S.AllCheckBox>
  );
}
