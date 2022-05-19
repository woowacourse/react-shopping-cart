import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { deleteCartItem, postCartItem } from "../../store/actions";

import CheckBox from "../../components/common/CheckBox";
import NumberInput from "../../components/common/NumberInput";

import DeleteFromCartButton from "./DeleteFromCartButton";

function CartProductListItem({ product, selected, handleCheckBoxClick }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(Number(product.quantity));

  const PRODUCT_QUANTITY_CONDITION = {
    MIN: 1,
    MAX: 20,
    STEP: 1,
  };

  const handleNumberInputChange = (e) => {
    if (Number(e.target.value) > PRODUCT_QUANTITY_CONDITION.MAX) {
      setQuantity(PRODUCT_QUANTITY_CONDITION.MAX);
      return;
    }
    setQuantity(e.target.value);
  };

  const handleNumberIncreaseButtonClick = () => {
    const newQuantity = quantity + PRODUCT_QUANTITY_CONDITION.STEP;
    if (newQuantity > PRODUCT_QUANTITY_CONDITION.MAX) return;
    setQuantity(newQuantity);
  };

  const handleNumberDecreaseButtonClick = () => {
    const newQuantity = quantity - PRODUCT_QUANTITY_CONDITION.STEP;
    if (newQuantity < PRODUCT_QUANTITY_CONDITION.MIN) return;
    setQuantity(newQuantity);
  };

  useEffect(() => {
    dispatch(postCartItem([{ id: product.id, quantity }]));
  }, [quantity]);

  return (
    <CartItemContainer>
      <CheckBox checked={selected} onClick={handleCheckBoxClick} />
      <img
        src={product.thumbnailUrl}
        alt={product.name}
        width="144px"
        height="144px"
      />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>
        {(product.price * quantity).toLocaleString()}원
      </ProductPrice>
      <ProductQuantityManagement>
        <DeleteFromCartButton
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("해당 상품을 장바구니에서 삭제하시겠습니까?")) {
              dispatch(deleteCartItem([product.id]));
            }
          }}
        />
        <NumberInput
          value={quantity}
          onChangeValue={handleNumberInputChange}
          onClickIncreaseButton={handleNumberIncreaseButtonClick}
          onClickDecreaseButton={handleNumberDecreaseButtonClick}
        />
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
