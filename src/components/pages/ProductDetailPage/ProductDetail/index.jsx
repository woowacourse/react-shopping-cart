import React from "react";
import { LOCAL_STORAGE_CART_LIST_KEY } from "../../../../constants";

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

const removeDuplicatedIdFromObjectArray = (array, newItem) => {
  const newArray = array.filter((item) => item.id !== newItem.id);
  return [...newArray, newItem];
};

function ProductDetail({ selectedProduct: { id, thumbnailUrl, name, price } }) {
  const handleClickCartButton = () => {
    let cartList = [];
    try {
      cartList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_LIST_KEY));
    } catch (error) {
      localStorage.setItem(LOCAL_STORAGE_CART_LIST_KEY, JSON.stringify([]));
      alert("장바구니에 담기 실패했습니다.");
      return;
    }

    alert("장바구니에 담겼습니다.");
    if (!cartList) {
      localStorage.setItem(
        LOCAL_STORAGE_CART_LIST_KEY,
        JSON.stringify([{ id, count: 1 }])
      );
      return;
    }

    localStorage.setItem(
      LOCAL_STORAGE_CART_LIST_KEY,
      JSON.stringify(
        removeDuplicatedIdFromObjectArray(cartList, { id, count: 1 })
      )
    );
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
