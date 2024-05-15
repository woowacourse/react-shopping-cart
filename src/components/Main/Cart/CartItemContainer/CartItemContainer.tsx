/** @jsxImportSource @emotion/react */
import { CartItemContainerStyle } from "./CartItemContainer.style";
import CartItemControls from "./CartItemControls/CartItemControls";
import CartItemList from "./CartItemList/CartItemList";

const CartItemContainer = () => {
  return (
    <div css={CartItemContainerStyle}>
      <CartItemControls></CartItemControls>
      <CartItemList></CartItemList>
    </div>
  );
};

export default CartItemContainer;
