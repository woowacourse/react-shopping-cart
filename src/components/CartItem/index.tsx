import React from "react";
import styled from "styled-components";

import deleteIcon from "../../assets/deleteIcon_gray.png";

function CartItem() {
  return (
    <CartItemWrapper>
      <input type="checkbox" />
      <CartItemImage
        src="https://cdn-mart.baemin.com/sellergoods/main/ed5392ab-b239-4306-a13b-c671708d200e.jpg"
        alt="상품 이미지"
      />
      <CartItemName>[든든] 야채바삭 김말이 700g</CartItemName>
      <CartItemInfoWrapper>
        <DeleteIcon src={deleteIcon} alt="장바구니 삭제" />
        <CartCounter>
          <CartCounterNumber>1</CartCounterNumber>
          <CartCounterIncreaseButton>▲</CartCounterIncreaseButton>
          <CartCounterDecreaseButton>▼</CartCounterDecreaseButton>
        </CartCounter>
        <div>5,100원</div>
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
