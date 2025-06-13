import {
  useSelectContext,
  useSelectDispatch,
} from "../../stores/SelectContext";
import CheckBox from "../CheckBox/CheckBox";
import * as S from "./TitleSection.styled";

interface TitleSectionProps {
  itemTypeCount: number;
}

function TitleSection({ itemTypeCount }: TitleSectionProps) {
  const selectState = useSelectContext();
  const selectDispatch = useSelectDispatch();

  const isAllSelected = selectState.every((item) => item.selected);

  const handleSelectAll = () => {
    if (isAllSelected) {
      selectDispatch({
        type: "DESELECT_ALL",
        payload: {},
      });
    } else {
      selectDispatch({
        type: "SELECT_ALL",
        payload: {},
      });
    }
  };

  return (
    <div>
      <S.Description>
        현재 {itemTypeCount}종류의 상품이 담겨있습니다.
      </S.Description>

      <CheckBox
        text="전체선택"
        isChecked={isAllSelected}
        onClick={handleSelectAll}
      />
    </div>
  );
}

export default TitleSection;
