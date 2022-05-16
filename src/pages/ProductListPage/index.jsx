import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getProductList } from "../../store/actions";

import Spinner from "../../components/common/Spinner";
import ProductCard from "./ProductCard";

function ProductListPage() {
  const dispatch = useDispatch();
  const {
    data: productList,
    loading: isLoading,
    errorMessage,
  } = useSelector((state) => state.productListReducer.productList);

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  if (isLoading) return <Spinner />;
  if (errorMessage) return <div>😱 Error: {errorMessage} 😱</div>;

  if (productList?.length === 0) return <h2>😱 텅 비었어요~~ 😱</h2>;

  return (
    <GridList>
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </GridList>
  );
}

const GridList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;

  height: 100%;
  gap: 28px 12px;

  overflow-y: hidden;

  :hover {
    overflow-y: auto;
  }
`;

export default ProductListPage;
