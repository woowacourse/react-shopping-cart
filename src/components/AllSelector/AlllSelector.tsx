import useCart from "../../hooks/contexts/useCart";
import Checkbox from "../@common/Checkbox/Checkbox";
import Description from "../@common/Description/Description";
import * as S from "./AllSelector.styles";

const AllSelector = () => {
  const { allSelected, toggleAllSelected } = useCart();

  return (
    <S.AllSelector>
      <Checkbox selected={allSelected} onClick={toggleAllSelected} />
      <Description>전체 선택</Description>
    </S.AllSelector>
  );
};

export default AllSelector;
