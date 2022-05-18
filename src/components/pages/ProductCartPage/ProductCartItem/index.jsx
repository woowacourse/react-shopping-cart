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
  ProductCartPrice,
} from "./styled";

function ProductCartItem({
  product: { id, thumbnailUrl, name, price, quantity },
  amount,
}) {
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

  const totalPrice = price ? Number(price) * count : null;

  return (
    <ProductCartContainer>
      <CheckBox
        isChecked={isChecked}
        handleChangeCheckbox={handleChangeCheckbox}
      />
      <ProductCartImage src={thumbnailUrl ?? ""} alt={name ?? "%ERROR%"} />
      <ProductCartName>{name ?? "%ERROR%"}</ProductCartName>
      <ProductCartControlBox>
        <IconButton src={trashCanIcon} alt="현재 상품 삭제 버튼" />
        <Counter
          count={count}
          handleClickDecreaseButton={handleClickDecreaseButton}
          handleClickIncreaseButton={handleClickIncreaseButton}
        />
        <ProductCartPrice>
          {totalPrice?.toLocaleString() || "%ERROR%"}원
        </ProductCartPrice>
      </ProductCartControlBox>
    </ProductCartContainer>
  );
}

export default ProductCartItem;
