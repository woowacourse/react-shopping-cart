import React from "react";
import { css } from "@emotion/css";
import { useRecoilValue } from "recoil";
import { cartItemsAtom } from "../../recoil/atom";

const CartTitle = () => {
  const cartItems = useRecoilValue(cartItemsAtom);

  return (
    <div className={cartTitleCSS}>
      <div className={cartTitleTextCSS}>장바구니</div>
      {cartItems.length > 0 && (
        <div className={cartTitleSubTextCSS}>
          <p>현재 {cartItems.length}종류의 상품이 담겨있습니다.</p>
        </div>
      )}
    </div>
  );
};

export default CartTitle;

const cartTitleCSS = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const cartTitleTextCSS = css`
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  text-align: left;
`;

const cartTitleSubTextCSS = css`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
`;
