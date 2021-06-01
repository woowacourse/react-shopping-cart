import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../store/modules/productSlice";
import ProductListItem from "../ProductListItem/ProductListItem";
import * as S from "./ProductList.styled";

const ProductList = () => {
  const productList = useSelector(selectAllProducts);

  return (
    <S.ProductList>
      {productList.map((product) => (
        <ProductListItem key={product.productId} item={product} />
      ))}
    </S.ProductList>
  );
};

export default ProductList;
