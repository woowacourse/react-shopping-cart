import { CartItem } from "../types/cartItems";
import CartItemView from "./CartItemView";
import { selectedCartItemIdsState } from "../recoil/cart/selectedCartItemIds";
import styled from "styled-components";
import { useCartItemControl } from "../hooks/useCartItemControl";
import { useSetRecoilState } from "recoil";

export interface ICartItemList {
  cartItems: CartItem[];
}

function CartItemList({ cartItems }: ICartItemList) {
  const cartItemControl = useCartItemControl();
  const setSelectedCartItemIds = useSetRecoilState(selectedCartItemIdsState);
  const isAllSelected = cartItems.every(({ isSelected }) => isSelected);

  const handleSelectAllChange = () => {
    if (isAllSelected) {
      setSelectedCartItemIds([]);
    } else {
      setSelectedCartItemIds(cartItems.map(({ id }) => id));
    }
  };

  return (
    <S.CartItemListContainer>
      <S.SelectAll>
        <S.Checkbox
          id="select-all-checkbox"
          type="checkbox"
          checked={isAllSelected}
          onChange={handleSelectAllChange}
        />
        <S.SelectAllLabel htmlFor="select-all-checkbox">
          전체선택
        </S.SelectAllLabel>
      </S.SelectAll>
      <S.CartItemList>
        {cartItems.map((cartItem) => (
          <CartItemView
            key={cartItem.product.id}
            cartItem={cartItem}
            cartItemControl={cartItemControl}
          />
        ))}
      </S.CartItemList>
    </S.CartItemListContainer>
  );
}

CartItemList.Skeleton = () => {
  return (
    <S.CartItemListContainer>
      <S.SelectAll>
        <S.CheckboxSkeleton />
      </S.SelectAll>
      <S.CartItemList>
        {Array.from({ length: 3 }).map((_, idx) => (
          <CartItemView.Skeleton key={idx} />
        ))}
      </S.CartItemList>
    </S.CartItemListContainer>
  );
};

export default CartItemList;

const S = {
  CartItemListContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    margin: 36px 0 52px 0;
  `,

  CartItemList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,

  SelectAll: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  Checkbox: styled.input`
    accent-color: black;
    margin: 0;
    width: 24px;
    height: 24px;
  `,

  SelectAllLabel: styled.label`
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
  `,

  CheckboxSkeleton: styled.div`
    width: 24px;
    height: 24px;
    background-color: #e0e0e0;
    border-radius: 4px;
  `,
};
