import { css } from "@emotion/css";
import CartItemComponent from "./CartItem";
import Button from "../default/Button";
import Splitter from "../default/Splitter";
import CheckIcon from "../../assets/CheckIcon.svg?react";

import { deleteCartItem as deleteRequestCartItem } from "../../api/cartItem";
import { useRecoilState } from "recoil";
import { cartItemListAtom } from "../../recoil/cart/cartItemState";
import { isAllCheckedSelector } from "../../recoil/cart/checkedState";

const CartItems = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemListAtom);
  const [isAllChecked, setIsAllChecked] = useRecoilState(isAllCheckedSelector);

  const handleAllChecked = () => {
    setIsAllChecked((prev) => !prev);
  };

  const handleDelete = (id: number) => {
    deleteRequestCartItem(id);
    setCartItems((prev) => prev.filter((cartItem) => id !== cartItem.id));
  };

  return (
    <div className={cardItemCSS}>
      <div className={allCheckContainerCSS}>
        <Button variant={isAllChecked ? "primary" : "secondary"} onClick={handleAllChecked}>
          <CheckIcon fill={isAllChecked ? "#ffffff" : "#0000001A"} />
        </Button>
        <span>전체 선택</span>
      </div>
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <Splitter />
            <CartItemComponent product={item} handleDelete={() => handleDelete(item.id)} />
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
