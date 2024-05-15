/** @jsxImportSource @emotion/react */
import { CartItemTypesCountStyle, CartTitleStyle } from "./CartTitle.style";

const CartTitle = () => {
  const count = 3;

  return (
    <div>
      <h1 css={CartTitleStyle}>장바구니</h1>
      <div css={CartItemTypesCountStyle}>현재 {count}종류의 상품이 담겨 있습니다.</div>
    </div>
  );
};

export default CartTitle;
