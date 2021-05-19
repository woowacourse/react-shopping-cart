import React from "react";
import useCartSelector from "../../hooks/useCartSelector";
import useProductSelector from "../../hooks/useProductSelector";
import Product from "./Product/Product";
import * as S from "./ProductsList.styled";

const ProductsList = () => {
  const productsList = useProductSelector();
  useCartSelector();

  return (
    <S.ProductsList>
      {productsList.map((product) => (
        <Product key={product.productId} product={product} />
      ))}
    </S.ProductsList>
  );
};

export default ProductsList;
