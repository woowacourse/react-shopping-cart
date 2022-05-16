import React from "react";
import { useParams } from "react-router-dom";

import { useFetch } from "../../../hooks/useFetch";

import Spinner from "../../common/Spinner";
import { DetailContainer } from "./styled";

import { BASE_SERVER_URL, PRODUCT_LIST_PATH } from "../../../constants";
import ErrorPage from "../ErrorPage";
import ProductDetail from "./ProductDetail";

function ProductDetailPage() {
  const { id: productId } = useParams();
  const productURL = `${BASE_SERVER_URL}${PRODUCT_LIST_PATH}/${productId}`;
  const {
    data: selectedProduct,
    isLoading,
    errorMessage,
  } = useFetch(productURL);

  const renderContent = () => {
    if (isLoading) return <Spinner />;

    if (errorMessage)
      return (
        <ErrorPage>
          😱 Error: 관리자에게 문의하세요.😱 <br /> %{errorMessage}%
        </ErrorPage>
      );

    return <ProductDetail selectedProduct={selectedProduct} />;
  };

  return <DetailContainer>{renderContent()}</DetailContainer>;
}

export default ProductDetailPage;
