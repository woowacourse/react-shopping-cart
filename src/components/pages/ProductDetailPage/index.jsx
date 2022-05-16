import React from "react";
import { useParams } from "react-router-dom";

import { useFetch } from "../../../hooks/useFetch";

import DefaultButton from "../../common/DefaultButton";
import Spinner from "../../common/Spinner";
import {
  Bottom,
  DetailContainer,
  ProductImage,
  ProductName,
  ProductPrice,
  Span,
  Top,
} from "./styled";

import { BASE_SERVER_URL, PRODUCT_LIST_PATH } from "../../../constants";
import { theme } from "../../../style";

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
        <div>
          😱 Error: 관리자에게 문의하세요.😱 <br /> %{errorMessage}%
        </div>
      );

    return (
      <>
        <Top>
          <ProductImage src={selectedProduct?.thumbnailUrl ?? ""} />
          <ProductName>{selectedProduct?.name ?? "%Error%"}</ProductName>
        </Top>
        <Bottom>
          <Span>금액</Span>
          <ProductPrice>
            {selectedProduct?.price?.toLocaleString() ?? "%Error%"}원
          </ProductPrice>
        </Bottom>
        <DefaultButton
          onClick={() => {
            alert("🛒아직입니다~~^^🛒");
          }}
          bgColor={theme.color.point}
        >
          장바구니 담기
        </DefaultButton>
      </>
    );
  };

  return <DetailContainer>{renderContent()}</DetailContainer>;
}

export default ProductDetailPage;
