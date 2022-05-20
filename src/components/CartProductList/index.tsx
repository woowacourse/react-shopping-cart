import { useState } from "react";
import { useDispatch } from "react-redux";
import { CartItem, deleteBySelectedItems, selectAllItems } from "../../redux/modules/cart";
import { useCartListSelector } from "../../hooks/useCartSelector";

import Button from "../@shared/Button/styles";
import CheckBox from "../@shared/CheckBox/styles";
import CartProduct from "../CartProduct";
import { CartListTitle, SelectAllContainer } from "./styles";

function CartProductList() {
  const dispatch = useDispatch();
  const cartItemList = useCartListSelector();
  const [allSelect, setAllSelect] = useState(false);

  const onToggleAllSelect = () => {
    setAllSelect((prev) => !prev);
    dispatch(selectAllItems(allSelect));
  };

  const onClickDeleteItems = () => {
    confirm("선택된 상품을 삭제 하시겠습니까?") && dispatch(deleteBySelectedItems());
  };

  return (
    <div>
      <SelectAllContainer>
        <div>
          <CheckBox checked={allSelect} onChange={onToggleAllSelect} />
          <span>{allSelect ? "선택해제" : "전제선택"}</span>
        </div>
        <Button onClick={onClickDeleteItems}>상품삭제</Button>
      </SelectAllContainer>
      <CartListTitle>든든배송 상품</CartListTitle>
      {cartItemList.map((item: CartItem) => (
        <CartProduct key={item.id} {...{ item }} />
      ))}
    </div>
  );
}

export default CartProductList;
