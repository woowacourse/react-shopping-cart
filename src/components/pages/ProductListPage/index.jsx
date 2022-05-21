import React, { useEffect } from "react";

import { useStore } from "hooks/useStore";
import { getProductList } from "reducers/productList";

import Spinner from "components/common/Spinner";
import ProductCard from "./ProductCard";
import GridContainer from "components/common/GridContainer";
import ErrorPage from "components/pages/ErrorPage";

function ProductListPage() {
  const {
    data: productList,
    isLoading,
    errorMessage,
    dispatch,
  } = useStore("productList");

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  if (isLoading) return <Spinner />;
  if (errorMessage)
    return (
      <ErrorPage>
        😱 Error: 관리자에게 문의하세요.😱 <br /> %{errorMessage}%
      </ErrorPage>
    );
  if (!productList?.length) return <h2>😱 텅 비었어요~~ 😱</h2>;

  return (
    <GridContainer colNo={4}>
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </GridContainer>
  );
}

export default ProductListPage;
