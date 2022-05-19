import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { actionCreators as CartActions } from "../../redux/modules/cart";

function CartItemListController() {
  const dispatch = useDispatch();

  return (
    <CartItemListControllerWrapper justify="space-between">
      <CartItemListSelect>
        <input
          type="checkbox"
          id="all-check"
          onClick={(e) => {
            const targetInput = e.target as HTMLInputElement;
            dispatch(CartActions.toggleAllItemsSelected(targetInput.checked));
          }}
        />
        <label htmlFor="all-check">선택해제</label>
      </CartItemListSelect>
      <CartItemListDeleteButton>상품삭제</CartItemListDeleteButton>
    </CartItemListControllerWrapper>
  );
}

export default CartItemListController;

const FlexBox = styled.div<{ direction?: string; justify?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ justify = "center" }) => justify};
  flex-direction: ${({ direction = "row" }) => direction};
`;

const CartItemListControllerWrapper = styled(FlexBox)``;

const CartItemListSelect = styled.p`
  padding: 20px 0;
  label {
    margin-left: 6px;
  }
`;

const CartItemListDeleteButton = styled.button`
  width: 80px;
  height: 36px;
  background-color: white;
  border: 1px solid #dddddd;
  cursor: pointer;

  &:hover {
    background-color: #dddddd;
  }
`;
