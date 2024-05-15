import { useRecoilValue, useSetRecoilState } from "recoil";
import CartItemView from "./CartItemView";
import { cartItemsState } from "../recoil/cartItems";
import styled from "styled-components";
import { selectedCartItemIdsState } from "../recoil/selectedCartItemIds";

export default function CartItemList() {
  const cartItems = useRecoilValue(cartItemsState);
  const setSelectedCartItemIds = useSetRecoilState(selectedCartItemIdsState);
  const isAllSelected = cartItems.every(({ isSelected }) => isSelected);

  const handleSelectAllChange = () => {
    if (isAllSelected) {
      setSelectedCartItemIds([]);
    } else {
      setSelectedCartItemIds(cartItems.map(({ id }) => id));
    }
  };

  if (cartItems.length === 0) {
    return <div>장바구니에 담긴 상품이 없습니다.</div>;
  }

  return (
    <S.CartItemListContainer>
      <S.SelectAll>
        <S.Checkbox
          id="select-all-checkbox"
          type="checkbox"
          checked={isAllSelected}
          onChange={handleSelectAllChange}
        />
        <S.SelectAllLabel htmlFor="select-all-checkbox">전체선택</S.SelectAllLabel>
      </S.SelectAll>
      <div>
        {cartItems.map((cartItem) => (
          <CartItemView key={cartItem.product.id} cartItem={cartItem} />
        ))}
      </div>
    </S.CartItemListContainer>
  );
}

const S = {
  CartItemListContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    width: 382px;
  `,

  SelectAll: styled.div`
    display: flex;
    gap: 8px;
  `,

  Checkbox: styled.input``,

  SelectAllLabel: styled.label`
    font-size: 16px;
  `,
};
