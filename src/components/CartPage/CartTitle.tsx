import { css } from "@emotion/css";
import { useRecoilValue } from "recoil";
import { cartItemsAtom } from "../../recoil/atom/atom";

const CartTitle = () => {
  const cartItems = useRecoilValue(cartItemsAtom);

  return (
    <div className={cartTitleCSS}>
      <div className={cartTitleTextCSS}>장바구니</div>
      {cartItems.length > 0 && <p className={cartTitleSubTextCSS}>현재 {cartItems.length}종류의 상품이 담겨있습니다.</p>}
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
  font: var(--cart-title);
  text-align: left;
`;

const cartTitleSubTextCSS = css`
  font: var(--cart-label);
  color: var(--grey-400);
  text-align: left;
`;
