import React from "react";
import * as S from "./index.styles";

const ShoppingCartProductsController = ({
  isAllChecked,
  onAllCheckedClick,
  onRemoveAllItemClick,
}) => {
  return (
    <S.ProductsControlContainer>
      <S.ProductsCheckBoxContainer>
        <S.ProductsCheckBox
          type="checkbox"
          id="total-check"
          name="total-check"
          checked={isAllChecked}
          onChange={onAllCheckedClick}
        />
        <label htmlFor="total-check">
          {isAllChecked ? "선택해제" : "전체선택"}
        </label>
      </S.ProductsCheckBoxContainer>
      <S.ProductsRemoveButton onClick={onRemoveAllItemClick} type="button">
        상품삭제
      </S.ProductsRemoveButton>
    </S.ProductsControlContainer>
  );
};

export default ShoppingCartProductsController;
