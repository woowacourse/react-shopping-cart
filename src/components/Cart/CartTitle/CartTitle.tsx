/** @jsxImportSource @emotion/react */
import { useRecoilValue } from "recoil";
import { CartItemTypesCountStyle, CartTitleStyle } from "./CartTitle.style";
import { cartItemIdListState } from "../../../store/atom/atoms";

const CartTitle = () => {
  const ids = useRecoilValue(cartItemIdListState);

  return (
    <div>
      <h1 css={CartTitleStyle}>장바구니</h1>
      {ids.length !== 0 && <div css={CartItemTypesCountStyle}>현재 {ids.length}종류의 상품이 담겨 있습니다.</div>}
    </div>
  );
};

export default CartTitle;
