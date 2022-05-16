import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { initializeProductInfoList } from "./../../../stores/productInfoListStore";
import { useFetch } from "../../../hooks/useFetch";

import Spinner from "../../common/Spinner";
import ProductCard from "./ProductCard";

import { BASE_SERVER_URL, PRODUCT_LIST_PATH } from "../../../constants";
import GridContainer from "../../common/GridContainer";

const productListURL = `${BASE_SERVER_URL}${PRODUCT_LIST_PATH}`;

function ProductListPage() {
  const dispatch = useDispatch();
  const productInfoList = useSelector((state) => state);

  const {
    isLoading,
    errorMessage,
    data: fetchedData,
  } = useFetch(productListURL, []);

  useEffect(() => {
    if (!isLoading && !errorMessage) {
      dispatch(initializeProductInfoList({ products: fetchedData }));
    }
  }, [isLoading, errorMessage]);

  if (isLoading) return <Spinner />;
  if (errorMessage)
    return (
      <div>
        😱 Error: 관리자에게 문의하세요.😱 <br /> %{errorMessage}%
      </div>
    );
  if (!productInfoList?.length) return <h2>😱 텅 비었어요~~ 😱</h2>;

  return (
    <GridContainer colNo={4}>
      {productInfoList.map((productInfo) => (
        <ProductCard key={productInfo.id} productInfo={productInfo} />
      ))}
    </GridContainer>
  );
}

export default ProductListPage;
