import { useCartState } from "../../../domains/cart/hooks/useCartState";
import useCartToggle from "../../../domains/cart/hooks/useCartToggle";
import Checkbox from "../../@common/Checkbox/Checkbox";
import Description from "../../@common/Description/Description";
import * as S from "./AllSelector.styles";

const AllSelector = () => {
  const { allSelected } = useCartState();
  const { toggleAllSelected } = useCartToggle();

  return (
    <S.AllSelector>
      <Checkbox selected={allSelected} onClick={toggleAllSelected} />
      <Description>전체 선택</Description>
    </S.AllSelector>
  );
};

export default AllSelector;
