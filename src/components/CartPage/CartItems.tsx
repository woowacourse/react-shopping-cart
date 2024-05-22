import { css } from "@emotion/css";
import CartItem from "./CartItem";
import CheckIcon from "../../assets/CheckIcon.svg?react";

import { deleteCartItem } from "../../api/cartItemApi";
import useCartChecked from "../../hooks/useCartItemChecks";
import { Button, Splitter } from "../default";

const CartItems = () => {
  const { cartItems, setCartItems, setCheckedIds, isAllChecked, setIsAllChecked } = useCartChecked();

  const handleAllChecked = () => {
    setIsAllChecked((prev) => !prev);
  };

  const handleDelete = (id: number) => {
    deleteCartItem(id);
    setCartItems((prev) => prev.filter((cartItem) => id !== cartItem.id));
    setCheckedIds((prev) => prev.filter((itemId) => id !== itemId));
  };

  return (
    <div className={cardItemCSS}>
      <div className={allCheckContainerCSS}>
        <Button
          variant={isAllChecked ? "primary" : "secondary"}
          size="small"
          onClick={handleAllChecked}
        >
          <CheckIcon fill={isAllChecked ? "var(--grey-100)" : "var(--grey-200)"} />
        </Button>
        <span className={allCheckedTestCSS}>전체 선택</span>
      </div>
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <Splitter />
            <CartItem
              product={item}
              handleDelete={() => handleDelete(item.id)}
            />
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

const allCheckedTestCSS = css`
  font: var(--cart-label);
  color: var(--grey-400);
`;
