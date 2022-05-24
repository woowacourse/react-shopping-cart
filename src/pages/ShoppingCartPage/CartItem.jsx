import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useNumberInput } from "../../hooks/useNumberInput";

import IconButton from "../../components/common/IconButton";
import CheckBox from "../../components/common/CheckBox";
import NumberInput from "../../components/common/NumberInput";
import {
  StyledCartItemContainer,
  StyledProductName,
  StyledProductPrice,
  StyledProductQuantityManagement,
} from "./CartItem.styled";

import { PRODUCT_QUANTITY_CONDITION } from "../../constants";
import { PATH } from "../../constants/index";
import trashCanIcon from "../../asset/trash-can-icon.svg";

function CartItem({
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
    <StyledCartItemContainer>
      <CheckBox checked={selected} onClick={onClickCheckBox} />

      <Link to={PATH.PRODUCT_DETAIL_WITH_ID(product.id)}>
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          width="144px"
          height="144px"
        />
        <StyledProductName>{product.name}</StyledProductName>
      </Link>

      <StyledProductPrice>
        {(product.price * quantity).toLocaleString()}원
      </StyledProductPrice>
      <StyledProductQuantityManagement>
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
      </StyledProductQuantityManagement>
    </StyledCartItemContainer>
  );
}

function DeleteFromCartButton({ onClick }) {
  return (
    <IconButton
      title="장바구니에서 삭제하기"
      onClick={onClick}
      iconImgSrc={trashCanIcon}
      iconImgAlt="쓰레기통 아이콘"
      width="24px"
    />
  );
}

export default CartItem;
