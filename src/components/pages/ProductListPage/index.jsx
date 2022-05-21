import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProductList } from "../../../reducers/productList";

import Spinner from "../../common/Spinner";
import ProductCard from "./ProductCard";
import GridContainer from "../../common/GridContainer";
import ErrorPage from "../ErrorPage";

function ProductListPage() {
  const {
    data: productList,
    isLoading,
    errorMessage,
  } = useSelector((state) => state.productList);
  const dispatch = useDispatch();

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
