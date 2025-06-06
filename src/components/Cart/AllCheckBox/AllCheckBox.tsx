import * as Styled from "./AllCheckBox.style";

import checked from "/checked.svg";
import unChecked from "/unChecked.svg";

interface AllCheckBoxProps {
  isAllSelected: boolean;
  handleToggleAllSelection: (isAllSelected: boolean) => void;
}

function AllCheckBox({
  isAllSelected,
  handleToggleAllSelection,
}: AllCheckBoxProps) {
  return (
    <Styled.AllSelectWrapper>
      <Styled.SelectButton
        onClick={() => handleToggleAllSelection(isAllSelected)}
        type="button"
        aria-label={isAllSelected ? "전체 선택 해제" : "전체 선택"}
      >
        <Styled.SelectIcon
          src={isAllSelected ? checked : unChecked}
          alt={isAllSelected ? "전체 선택됨" : "전체 선택 안 됨"}
        />
      </Styled.SelectButton>
      <p>전체선택</p>
    </Styled.AllSelectWrapper>
  );
}

export default AllCheckBox;
