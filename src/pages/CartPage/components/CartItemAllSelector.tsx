import useSelectAllCartItem from "@/hooks/useSelectAllCartItem";

import CheckBox from "@/components/_common/CheckBox/CheckBox";
import Caption from "@/components/_common/Caption/Caption";

import Styled from "../CartPage.style";

const CartItemAllSelector = () => {
  const { isAllItemSelected, selectAllItem, unselectAllItem } =
    useSelectAllCartItem();
  return (
    <Styled.CheckBoxWrapper>
      <CheckBox
        isChecked={isAllItemSelected}
        onClick={isAllItemSelected ? unselectAllItem : selectAllItem}
      />
      <Caption text="전체선택" />
    </Styled.CheckBoxWrapper>
  );
};

export default CartItemAllSelector;
