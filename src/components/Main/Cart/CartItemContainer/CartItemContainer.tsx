import { PropsWithChildren } from "react";
import { useRecoilValue } from "recoil";

import { cartState } from "@/store/atom/atoms";

import { CartItemContainerStyle, CartItemEmptyStyle } from "./CartItemContainer.style";

const CartItemContainer = ({ children }: PropsWithChildren) => {
  const cartCount = useRecoilValue(cartState).length;

  return (
    <div css={CartItemContainerStyle}>
      {cartCount !== 0 ? <>{children}</> : <div css={CartItemEmptyStyle}>장바구니에 상품이 없습니다.</div>}
    </div>
  );
};

export default CartItemContainer;
