import { useSetRecoilState } from "recoil";
import CartItemView from "./CartItemView";
import styled from "styled-components";
import { selectedCartItemIdsState } from "../recoil/selectedCartItemIds";
import { CartItem } from "../types/cartItems";
import { useCartItemControl } from "../hooks/useCartItemControl";

export interface ICartItemList {
  cartItems: CartItem[];
}

export default function CartItemList({ cartItems }: ICartItemList) {
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
        <S.SelectAllLabel htmlFor="select-all-checkbox">전체선택</S.SelectAllLabel>
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
};
