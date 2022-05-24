import React from "react";

import { theme } from "style";

import { postBaseServerCartItem } from "util/fetch";

import DefaultButton from "components/common/Button/DefaultButton";
import {
  Bottom,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductPriceTitle,
  Top,
} from "./styled";

function ProductDetail({ selectedProduct: { id, thumbnailUrl, name, price } }) {
  const handleClickCartButton = async () => {
    try {
      const { isAlreadyExists } = await postBaseServerCartItem(
        JSON.stringify({ id, count: 1 })
      );

      if (isAlreadyExists) {
        alert("이미 장바구니에 담은 상품입니다.");
        return;
      }
    } catch (error) {
      alert(`장바구니 담기에 실패했습니다.`);
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
        <ProductPriceTitle>금액</ProductPriceTitle>
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
