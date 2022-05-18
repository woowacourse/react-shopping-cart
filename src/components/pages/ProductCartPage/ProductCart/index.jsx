import React, { useState } from "react";

import trashCanIcon from "../../../../asset/trash-can.svg";

import CheckBox from "../../../common/CheckBox";
import Counter from "../../../common/Counter";
import IconButton from "../../../common/IconButton";
import {
  ProductCartContainer,
  ProductCartControlBox,
  ProductCartImage,
  ProductCartName,
} from "./styled";

function ProductCart({ thumbnailUrl, name, price, amount }) {
  const [isChecked, setIsChecked] = useState(true);
  const [count, setCount] = useState(amount || 0);

  const handleClickIncreaseButton = () => {
    setCount((prev) => prev + 1);
  };

  const handleClickDecreaseButton = () => {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  };

  const handleChangeCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <ProductCartContainer>
      <CheckBox
        isChecked={isChecked}
        handleChangeCheckbox={handleChangeCheckbox}
      />
      <ProductCartImage
        src={
          thumbnailUrl ??
          "https://cdn-mart.baemin.com/sellergoods/main/92438f0e-0c4b-425e-b03b-999cee7cdca2.jpg"
        }
        alt={name ?? "%ERROR%"}
      />
      <ProductCartName>{name ?? "%ERROR%"}</ProductCartName>
      <ProductCartControlBox>
        <IconButton src={trashCanIcon} alt="담은 상품 삭제 버튼" />
        <Counter
          count={count}
          handleClickDecreaseButton={handleClickDecreaseButton}
          handleClickIncreaseButton={handleClickIncreaseButton}
        />
        <p>{price?.toLocaleString() ?? "%ERROR%"}원</p>
      </ProductCartControlBox>
    </ProductCartContainer>
  );
}

export default ProductCart;
