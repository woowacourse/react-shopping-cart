import useCart from "../../hooks/useCart";
import Checkbox from "../@common/Checkbox/Checkbox";
import Description from "../@common/Description/Description";
import * as S from "./AllSelector.styles";

const AllSelector = () => {
  const { isAllChecked, toggleAllChecked } = useCart();

  return (
    <S.AllSelector>
      <Checkbox
        data-testid="all-select-checkbox"
        checked={isAllChecked}
        onClick={toggleAllChecked}
      />
      <Description>전체 선택</Description>
    </S.AllSelector>
  );
};

export default AllSelector;
