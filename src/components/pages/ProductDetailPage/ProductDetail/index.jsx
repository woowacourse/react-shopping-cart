import React from "react";
import { BASE_SERVER_URL, SERVER_PATH } from "constants";

import { theme } from "style";

import DefaultButton from "components/common/DefaultButton";
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
      const response = await fetch(
        `${BASE_SERVER_URL}${SERVER_PATH.CART_LIST}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, count: 1 }),
        }
      );
      if (!response.ok) {
        throw new Error("response not ok");
      }

      const { isAlreadyExists } = await response.json();
      if (isAlreadyExists) {
        alert("이미 장바구니에 담은 상품입니다.");
        return;
      }
    } catch (error) {
      alert(`장바구니 담기에 실패했습니다. 에러: ${error.message}`);
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
