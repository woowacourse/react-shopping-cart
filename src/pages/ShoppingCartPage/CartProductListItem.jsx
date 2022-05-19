import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useNumberInput } from "../../hooks/useNumberInput";
import CheckBox from "../../components/common/CheckBox";
import NumberInput from "../../components/common/NumberInput";
import DeleteFromCartButton from "./DeleteFromCartButton";

import { PRODUCT_QUANTITY_CONDITION } from "../../constants";
import { PATH } from "./../../constants/index";

function CartProductListItem({
  product,
  selected,
  onClickCheckBox,
  updateQuantity,
  deleteSelf,
}) {
  const {
    value: quantity,
    handleInputChange,
    handleIncreaseButtonClick,
    handleDecreaseButtonClick,
  } = useNumberInput({
    initialValue: product.quantity,
    min: PRODUCT_QUANTITY_CONDITION.MIN,
    max: PRODUCT_QUANTITY_CONDITION.MAX,
    step: PRODUCT_QUANTITY_CONDITION.STEP,
  });

  useEffect(() => {
    if (!product || !quantity) return;
    updateQuantity(quantity);
  }, [quantity]);

  return (
    <CartItemContainer>
      <CheckBox checked={selected} onClick={onClickCheckBox} />

      <Link to={PATH.PRODUCT_DETAIL_WITH_ID(product.id)}>
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          width="144px"
          height="144px"
        />
        <ProductName>{product.name}</ProductName>
      </Link>

      <ProductPrice>
        {(product.price * quantity).toLocaleString()}원
      </ProductPrice>
      <ProductQuantityManagement>
        <DeleteFromCartButton
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("해당 상품을 장바구니에서 삭제하시겠습니까?"))
              deleteSelf();
          }}
        />
        <NumberInput
          value={quantity}
          onChangeValue={handleInputChange}
          onClickIncreaseButton={handleIncreaseButtonClick}
          onClickDecreaseButton={handleDecreaseButtonClick}
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

  a {
    display: flex;
    gap: 20px;
  }
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
