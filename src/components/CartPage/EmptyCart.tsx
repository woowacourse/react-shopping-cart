import { css } from "@emotion/css";

const EmptyCart = () => {
  return <div className={EmptyCartCSS}>장바구니에 담은 상품이 없습니다.</div>;
};

export default EmptyCart;

const EmptyCartCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
`;
