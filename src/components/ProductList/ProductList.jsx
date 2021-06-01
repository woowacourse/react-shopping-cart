import React from "react";
import useCartSelector from "../../hooks/useCartSelector";
import useProductSelector from "../../hooks/useProductSelector";
import ProductsListItem from "../ProductListItem/ProductListItem";
import * as S from "./ProductList.styled";

const ProductList = () => {
  const productsList = useProductSelector();
  useCartSelector();

  return (
    <S.ProductList>
      {productsList.map((product) => (
        <ProductsListItem key={product.productId} product={product} />
      ))}
    </S.ProductList>
  );
};

export default ProductList;
