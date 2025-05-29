import useCart from "../../hooks/useCart";
import Checkbox from "../@common/Checkbox/Checkbox";
import Description from "../@common/Description/Description";
import * as S from "./AllSelector.styles";

const AllSelector = () => {
  const { allChecked, toggleAllChecked } = useCart();

  return (
    <S.AllSelector>
      <Checkbox checked={allChecked} onClick={toggleAllChecked} />
      <Description>전체 선택</Description>
    </S.AllSelector>
  );
};

export default AllSelector;
