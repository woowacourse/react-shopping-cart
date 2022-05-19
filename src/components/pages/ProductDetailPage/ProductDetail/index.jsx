import React from "react";
import { BASE_SERVER_URL, SERVER_PATH } from "../../../../constants";

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

function ProductDetail({ selectedProduct: { id, thumbnailUrl, name, price } }) {
  const handleClickCartButton = async () => {
    try {
      await fetch(`${BASE_SERVER_URL}${SERVER_PATH.CART_LIST}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, count: 1 }),
      });
    } catch (error) {
      alert("장바구니 담기에 실패했습니다.");
      return;
    }

    alert("장바구니에 담았습니다.");
  };

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
        onClick={handleClickCartButton}
        bgColor={theme.color.point}
      >
        장바구니 담기
      </DefaultButton>
    </>
  );
}

export default ProductDetail;
