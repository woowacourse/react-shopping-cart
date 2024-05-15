/** @jsxImportSource @emotion/react */
import { Suspense } from "react";
import { CartItemContainerStyle } from "./CartItemContainer.style";
import CartItemControls from "./CartItemControls/CartItemControls";
import CartItemList from "./CartItemList/CartItemList";

const CartItemContainer = () => {
  return (
    <div css={CartItemContainerStyle}>
      <CartItemControls />
      <Suspense fallback={<div>Loading</div>}>
        <CartItemList />
      </Suspense>
    </div>
  );
};

export default CartItemContainer;
