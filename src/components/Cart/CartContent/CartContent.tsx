/** @jsxImportSource @emotion/react */
import { CartContentStyle } from "./CartContent.style";

import CartItemContainer from "../CartItemContainer/CartItemContainer";
import CartResults from "../CartResults/CartResults";
import CartTitle from "../CartTitle/CartTitle";

const CartContent = () => {
  return (
    <main css={CartContentStyle}>
      <CartTitle />
      <CartItemContainer />
      <CartResults />
    </main>
  );
};

export default CartContent;
