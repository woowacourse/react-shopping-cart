import { css } from "@emotion/css";
import { useRecoilValue } from "recoil";
import { cartItemListAtom } from "../../recoil/cart/cartItemState";

const CartTitle = ({ mainText, subText }: { mainText: string; subText: string }) => {
  const cartItems = useRecoilValue(cartItemListAtom);

  return (
    <div className={cartTitleCSS}>
      <div className={cartTitleTextCSS}>{mainText}</div>
      {cartItems.length > 0 && (
        <div className={cartTitleSubTextCSS}>
          <p>{subText}</p>
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
