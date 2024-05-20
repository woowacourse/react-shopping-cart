import { useRecoilValue } from "recoil";
import { CartItemTypesCountStyle, CartTitleStyle } from "./CartTitle.style";
import { cartState } from "@/store/atom/atoms";

const CartTitle = () => {
  const itemCount = useRecoilValue(cartState).length;

  return (
    <div>
      <h1 css={CartTitleStyle}>장바구니</h1>
      {itemCount !== 0 && <div css={CartItemTypesCountStyle}>현재 {itemCount}종류의 상품이 담겨 있습니다.</div>}
    </div>
  );
};

export default CartTitle;
