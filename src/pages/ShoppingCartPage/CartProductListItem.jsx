import React from "react";
import styled from "styled-components";

import CheckBox from "../../components/common/CheckBox";
import NumberInput from "../../components/common/NumberInput";
import DeleteFromCartButton from "./DeleteFromCartButton";

function CartProductListItem({ product }) {
  return (
    <CartItemContainer>
      <CheckBox />
      <img
        src={product.thumbnailUrl}
        alt={product.name}
        width="144px"
        height="144px"
      />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
      <ProductQuantityManagement>
        <DeleteFromCartButton />
        <NumberInput />
      </ProductQuantityManagement>
    </CartItemContainer>
  );
}

const CartItemContainer = styled.li`
  position: relative;

  display: flex;
  gap: 20px;
  width: 100%;
  height: 200px;
  padding: 25px 0;

  border-bottom: 1.5px solid ${({ theme }) => theme.color.grey_200};

  list-style-type: none;
`;

const ProductName = styled.p`
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.grey_700};
`;

const ProductPrice = styled.p`
  position: absolute;
  bottom: 25px;
  right: 0;

  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.grey_700};
`;

const ProductQuantityManagement = styled.div`
  position: absolute;
  top: 25px;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
`;

export default CartProductListItem;
