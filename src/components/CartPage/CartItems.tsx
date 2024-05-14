import React, { useState } from "react";
import { css } from "@emotion/css";
import CartItem from "./CartItem";
import { Button } from "../default/Button";
import CheckIcon from "../../assets/CheckIcon.svg?react";
import Splitter from "../default/Splitter";

const CartItems = () => {
  const [allChecked, setAllChecked] = useState(false);

  const handleAllChecked = () => {
    setAllChecked(!allChecked);
  };

  return (
    <div className={cardItemCSS}>
      <div className={allCheckContainerCSS}>
        <Button variant={allChecked ? "primary" : "secondary"} onClick={handleAllChecked}>
          <CheckIcon fill={allChecked ? "#ffffff" : "#0000001A"} />
        </Button>
        <span>전체 선택</span>
      </div>
      <div>
        {Array.from({ length: 2 }).map(() => (
          <div>
            <Splitter />
            <CartItem />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItems;

const cardItemCSS = css`
  width: 100%;
`;

const allCheckContainerCSS = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;
