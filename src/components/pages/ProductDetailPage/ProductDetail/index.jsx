import React from "react";

import { theme } from "../../../../style";

import DefaultButton from "../../../common/DefaultButton";
import {
  Bottom,
  ProductImage,
  ProductName,
  ProductPrice,
  DetailSpan,
  Top,
} from "./styled";

function ProductDetail({ selectedProduct: { thumbnailUrl, name, price } }) {
  return (
    <>
      <Top>
        <ProductImage src={thumbnailUrl ?? ""} alt={name} />
        <ProductName>{name ?? "%Error%"}</ProductName>
      </Top>
      <Bottom>
        <DetailSpan>금액</DetailSpan>
        <ProductPrice>{price?.toLocaleString() ?? "%Error%"}원</ProductPrice>
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
}

export default ProductDetail;
