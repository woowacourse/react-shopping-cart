import React from "react";
import { useParams } from "react-router-dom";

import { useFetch } from "../../../hooks/useFetch";

import BoxButton from "../../common/BoxButton";
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

function ProductDetailPage() {
  const { id: productId } = useParams();
  const productURL = `${BASE_SERVER_URL}${PRODUCT_LIST_PATH}/${productId}`;
  const {
    data: selectedProduct,
    isLoading,
    errorMessage,
  } = useFetch(productURL);

  return (
    <DetailContainer>
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <div>😱 Error: 관리자에게 문의하세요. 😱</div>
      ) : (
        <>
          <Top>
            <ProductImage src={selectedProduct.thumbnailUrl} />
            <ProductName>{selectedProduct.name}</ProductName>
          </Top>
          <Bottom>
            <Span>금액</Span>
            <ProductPrice>
              {selectedProduct.price.toLocaleString()}원
            </ProductPrice>
          </Bottom>
          <BoxButton
            onClick={() => {
              alert("🛒아직입니다~~^^🛒");
            }}
            bgColor="#73675C"
          >
            장바구니 담기
          </BoxButton>
        </>
      )}
    </DetailContainer>
  );
}

export default ProductDetailPage;
