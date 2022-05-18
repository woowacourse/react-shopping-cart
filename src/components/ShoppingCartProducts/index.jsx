import React from "react";
import ShoppingCartProduct from "../ShoppingCartProduct";
import * as S from "./index.styles";

const ShoppingCartProducts = ({ products }) => {
  return (
    <S.ShoppingCartProductsContainer>
      <S.ProductsControlContainer>
        <S.ProductsCheckBoxContainer>
          <S.ProductsCheckBox
            type="checkbox"
            id="total-check"
            name="total-check"
          />
          <label htmlFor="total-check">선택해제</label>
        </S.ProductsCheckBoxContainer>
        <S.ProductsRemoveButton type="button">상품삭제</S.ProductsRemoveButton>
      </S.ProductsControlContainer>
      <S.ProductsTotalQuantity>
        든든배송 상품 ({products.length}개)
      </S.ProductsTotalQuantity>
      <div>
        {products.map((product) => (
          <ShoppingCartProduct key={product.id} {...product} />
        ))}
      </div>
    </S.ShoppingCartProductsContainer>
  );
};

export default ShoppingCartProducts;
