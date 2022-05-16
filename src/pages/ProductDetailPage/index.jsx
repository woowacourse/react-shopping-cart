import React from "react";
import { useParams } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";

import Spinner from "../../components/common/Spinner";
import ProductDetailCard from "./ProductDetailCard";

import { BASE_SERVER_URL, PRODUCT_LIST_PATH } from "../../constants";

function ProductDetailPage() {
  const { id: productId } = useParams();

  const productURL = `${BASE_SERVER_URL}${PRODUCT_LIST_PATH}/${productId}`;

  const {
    data: selectedProduct,
    isLoading,
    errorMessage,
  } = useFetch(productURL);

  if (isLoading) return <Spinner />;
  if (errorMessage) return <div>😱 Error: {errorMessage} 😱</div>;

  return (
    <>
      <ProductDetailCard product={selectedProduct} />
    </>
  );
}

export default ProductDetailPage;
