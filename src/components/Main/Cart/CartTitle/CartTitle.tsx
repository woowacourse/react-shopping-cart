import { useRecoilValue } from "recoil";
import { CartItemTypesCountStyle, CartTitleStyle } from "./CartTitle.style";
import { cartState } from "@/store/atom/atoms";
import { PropsWithChildren } from "react";

interface CartTitle extends PropsWithChildren {
  description?: string;
}

const CartTitle = ({ description, children }: CartTitle) => {
  const itemCount = useRecoilValue(cartState).length;

  return (
    <div>
      <h1 css={CartTitleStyle}>{children}</h1>
      {itemCount !== 0 && <div css={CartItemTypesCountStyle}>현재 {itemCount}종류의 상품이 담겨 있습니다.</div>}
      {description && <div css={CartItemTypesCountStyle}>{description}</div>}
    </div>
  );
};

export default CartTitle;
