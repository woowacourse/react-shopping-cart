import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { initProductList } from "../../store";
import { useFetch } from "../../hooks/useFetch";

import Spinner from "../../components/common/Spinner";
import GridList from "./GridList";
import ProductCard from "./ProductCard";

import { BASE_SERVER_URL, PRODUCT_LIST_PATH } from "../../constants";

const productListURL = `${BASE_SERVER_URL}${PRODUCT_LIST_PATH}`;

function ProductListPage() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state);

  const {
    isLoading,
    errorMessage,
    data: fetchedData,
  } = useFetch(productListURL, []);

  useEffect(() => {
    if (!isLoading && !errorMessage) {
      dispatch(initProductList({ products: fetchedData }));
    }
  }, [isLoading, errorMessage]);

  const dataReady = !isLoading && !errorMessage;

  return (
    <>
      {isLoading && <Spinner />}
      {errorMessage && <div>😱 Error: {errorMessage} 😱</div>}

      {dataReady && productList.length === 0 && <h2>😱 텅 비었어요~~ 😱</h2>}

      {dataReady && productList.length > 0 && (
        <GridList>
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </GridList>
      )}
    </>
  );
}

export default ProductListPage;
