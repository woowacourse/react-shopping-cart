import { useDispatch } from "react-redux";

import { actionCreators as CartActions } from "../../redux/modules/cart";

import * as S from "./styles";

function CartItemListController() {
  const dispatch = useDispatch();

  return (
    <S.CartItemListControllerWrapper justify="space-between">
      <S.CartItemListSelect>
        <input
          type="checkbox"
          id="all-check"
          onClick={(e) => {
            const targetInput = e.target as HTMLInputElement;
            dispatch(CartActions.toggleAllItemsSelected(targetInput.checked));
          }}
        />
        <label htmlFor="all-check">선택해제</label>
      </S.CartItemListSelect>
      <S.CartItemListDeleteButton
        onClick={() => {
          if (confirm("상품을 장바구니에서 삭제하시겠습니까?")) {
            dispatch(CartActions.deleteSelectedItems());
          }
        }}
      >
        상품삭제
      </S.CartItemListDeleteButton>
    </S.CartItemListControllerWrapper>
  );
}

export default CartItemListController;
