import React from "react";
import styled from "styled-components";

import { actionCreators as CartActions, CartItem as CartItemType } from "../../redux/modules/cart";

import deleteIcon from "../../assets/deleteIcon_gray.png";
import { useDispatch } from "react-redux";

interface CartItemProps {
  cartItem: CartItemType;
}

function CartItem({ cartItem }: CartItemProps) {
  const dispatch = useDispatch();
  const { id, name, img, price } = cartItem.detail;

  const onClickDeleteItem = () => {
    if (confirm("상품을 장바구니에서 삭제하시겠습니까?")) {
      dispatch(CartActions.deleteItem(id));
    }
  };

  const onClickIncreaseCounter = () => {
    dispatch(CartActions.increment(id));
  };

  const onClickDecreaseCounter = () => {
    if (cartItem.amount > 1) dispatch(CartActions.decrement(id));
  };

  return (
    <CartItemWrapper>
      <input type="checkbox" />
      <CartItemImage src={img} alt={name} />
      <CartItemName>{name}</CartItemName>
      <CartItemInfoWrapper>
        <DeleteIcon src={deleteIcon} alt="장바구니 삭제" onClick={onClickDeleteItem} />
        <CartCounter>
          <CartCounterNumber>{cartItem.amount}</CartCounterNumber>
          <CartCounterIncreaseButton onClick={onClickIncreaseCounter}>▲</CartCounterIncreaseButton>
          <CartCounterDecreaseButton onClick={onClickDecreaseCounter}>▼</CartCounterDecreaseButton>
        </CartCounter>
        <div>{price.toLocaleString()}원</div>
      </CartItemInfoWrapper>
    </CartItemWrapper>
  );
}

export default CartItem;

const CartItemWrapper = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #cccccc;
  width: 100%;
`;

const CartItemImage = styled.img`
  width: 100px;
  margin: 0 12px;
`;

const CartItemName = styled.div`
  width: 100%;
`;

const DeleteIcon = styled.img`
  width: 16px;
  cursor: pointer;
`;

const CartItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
`;

const CartCounter = styled.div`
  display: grid;
  grid-template-columns: 50px 30px;
  grid-template-rows: repeat(2, 20px);
  width: 80px;
  height: 40px;
  border: 1px solid #dddddd;
`;

const CartCounterNumber = styled.div`
  grid-column: 1/2;
  grid-row: 1/-1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #dddddd;
  font-size: 18px;
`;

const CartCounterIncreaseButton = styled.div`
  grid-column: 2/-1;
  grid-row: 1/2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  font-size: 10px;
  cursor: pointer;
`;

const CartCounterDecreaseButton = styled.div`
  grid-column: 2/-1;
  grid-row: 2/-1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  cursor: pointer;
`;
