/** @jsxImportSource @emotion/react */
import { CartItemContainerStyle, CartItemEmptyStyle } from "./CartItemContainer.style";
import CartItemControls from "./CartItemControls/CartItemControls";
import CartItemList from "./CartItemList/CartItemList";

import { useRecoilValue } from "recoil";
import { itemIdsState } from "../../../../store/atom/atoms";

const CartItemContainer = () => {
  const ids = useRecoilValue(itemIdsState);

  return (
    <div css={CartItemContainerStyle}>
      {ids.length !== 0 ? (
        <>
          <CartItemControls />
          <CartItemList />
        </>
      ) : (
        <div css={CartItemEmptyStyle}>장바구니에 상품이 없습니다.</div>
      )}
    </div>
  );
};

export default CartItemContainer;
