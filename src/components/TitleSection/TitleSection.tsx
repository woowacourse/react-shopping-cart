import {
  useSelectContext,
  useSelectDispatch,
} from "../../stores/SelectContext";
import CheckBox from "../CheckBox/CheckBox";
import * as S from "./TitleSection.styled";

function TitleSection() {
  const selectState = useSelectContext();
  const selectDispatch = useSelectDispatch();

  const handlerSelectAll = () => {
    if (selectState.every((item) => item.selected)) {
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
      <S.Description>현재 2종류의 상품이 담겨있습니다.</S.Description>

      <CheckBox
        text={"전체선택"}
        isChecked={selectState.every((item) => item.selected)}
        onChange={handlerSelectAll}
      />
    </div>
  );
}

export default TitleSection;
