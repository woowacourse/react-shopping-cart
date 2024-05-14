import React, { useState } from "react";
import { css } from "@emotion/css";
import { Button } from "../default/Button";
import CheckIcon from "../../assets/CheckIcon.svg?react";
import MinusIcon from "../../assets/MinusIcon.svg?react";
import PlusIcon from "../../assets/PlusIcon.svg?react";

interface CardItemProps {}

const CartItem = () => {
  const [allChecked, setAllChecked] = useState(false);

  const handleAllChecked = () => {
    setAllChecked(!allChecked);
  };

  return (
    <div className={ItemCSS}>
      <div className={ItemHeaderCSS}>
        <Button variant={allChecked ? "primary" : "secondary"} onClick={handleAllChecked}>
          <CheckIcon fill={allChecked ? "#ffffff" : "#0000001A"} />
        </Button>
        <Button>삭제</Button>
      </div>
      <div className={ItemContentCSS}>
        <div>[ 이미지 ]</div>
        <div className={ItemInfoWithCountCSS}>
          <div className={ItemInfoCSS}>
            <div className={ItemNameCSS}>상품이름</div>
            <div className={ItemPriceCSS}>35,000원</div>
          </div>
          <div className={ItemCountCSS}>
            <div>
              <PlusIcon />
            </div>
            <p>[ 갯수 ]</p>
            <div>
              <MinusIcon />
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
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: center;
`;
