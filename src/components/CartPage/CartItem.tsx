import React, { useState } from "react";
import { css } from "@emotion/css";
import { Button } from "../default/Button";
import CheckIcon from "../../assets/CheckIcon.svg?react";
import MinusIcon from "../../assets/MinusIcon.svg?react";
import PlusIcon from "../../assets/PlusIcon.svg?react";
import { useRecoilState } from "recoil";
import { cartItemCheckedState } from "../../recoil/atom";
import { Product } from "../../types";

interface CardItemProps {
  product: Product;
}

const CartItem = ({ product }: CardItemProps) => {
  const [cartItemChecked, setCartItemChecked] = useRecoilState(cartItemCheckedState(product.id));

  const handleAllChecked = () => {
    setCartItemChecked(!cartItemChecked);
  };

  return (
    <div className={ItemCSS}>
      <div className={ItemHeaderCSS}>
        <Button variant={cartItemChecked ? "primary" : "secondary"} onClick={handleAllChecked}>
          <CheckIcon fill={cartItemChecked ? "#ffffff" : "#0000001A"} />
        </Button>
        <Button>삭제</Button>
      </div>
      <div className={ItemContentCSS}>
        <img src={product.product.imageUrl} className={ItemImageCSS} />
        <div className={ItemInfoWithCountCSS}>
          <div className={ItemInfoCSS}>
            <div className={ItemNameCSS}>{product.product.name}</div>
            <div className={ItemPriceCSS}>{product.product.price}</div>
          </div>
          <div className={ItemCountCSS}>
            <div>
              <MinusIcon />
            </div>
            <p>{product.quantity}</p>
            <div>
              <PlusIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

const ItemCSS = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
  padding-bottom: 20px;
`;
const ItemHeaderCSS = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ItemContentCSS = css`
  display: flex;
  flex-direction: row;
  column-gap: 24px;
  align-items: center;
`;

const ItemImageCSS = css`
  width: 112px;
  height: 112px;
  border-radius: 8px;
`;
const ItemInfoWithCountCSS = css`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;
const ItemInfoCSS = css`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const ItemNameCSS = css`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
`;
const ItemPriceCSS = css`
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  text-align: left;
`;
const ItemCountCSS = css`
  display: flex;
  column-gap: 8px;
  justify-content: flex-start;
  align-items: center;
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: center;
`;
