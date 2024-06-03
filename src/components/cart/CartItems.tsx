import { useRecoilValue } from "recoil";
import { css } from "@emotion/css";

import { cartItemsAtom } from "../../recoil/atom/atom";
import { useCartItemChecked } from "../../hooks/useCartItemChecked/useCartItemChecked";
import { CartItem } from "./index";
import { Button } from "../default";
import CheckIcon from "../../assets/CheckIcon.svg?react";

const CartItems = () => {
  const cartItems = useRecoilValue(cartItemsAtom);
  const { isAllChecked, handleAllChecked } = useCartItemChecked();

  return (
    <div className={cartItemCSS}>
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

      <div className={cartItemsCSS}>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            product={item}
          />
        ))}
      </div>
    </div>
  );
};

export default CartItems;

const cartItemCSS = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const allCheckContainerCSS = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const allCheckedTestCSS = css`
  font: var(--cart-label);
  color: var(--grey-400);
`;

const cartItemsCSS = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
