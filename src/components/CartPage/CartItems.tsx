import React from "react";
import { css } from "@emotion/css";
import CartItem from "./CartItem";
import { Button } from "../default/Button";
import CheckIcon from "../../assets/CheckIcon.svg?react";
import Splitter from "../default/Splitter";

import { deleteCartItem } from "../../api/cartItem";
import { useRecoilState } from "recoil";
import { cartItemCheckedIdsAtom, cartItemsAtom } from "../../recoil/atom";

const CartItems = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const [checkedIds, setCheckedIds] = useRecoilState(cartItemCheckedIdsAtom);

  const isAllChecked = cartItems.length === checkedIds.length;
  const handleAllChecked = () => {
    if (isAllChecked) {
      setCheckedIds([]);
      return;
    }
    setCheckedIds(cartItems.map((item) => item.id));
  };

  const handleDelete = (id: number) => {
    deleteCartItem(id);
    setCartItems((prev) => prev.filter((cartItem) => id !== cartItem.id));
    setCheckedIds((prev) => prev.filter((itemId) => id !== itemId));
  };

  return (
    <div className={cardItemCSS}>
      <div className={allCheckContainerCSS}>
        <Button variant={isAllChecked ? "primary" : "secondary"} onClick={handleAllChecked}>
          <CheckIcon fill={isAllChecked ? "#ffffff" : "#0000001A"} />
        </Button>
        <span>전체 선택 {`${checkedIds}`}</span>
      </div>
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <Splitter />
            <CartItem product={item} handleDelete={() => handleDelete(item.id)} />
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
