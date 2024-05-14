import { css } from "@emotion/css";

const CartPage = () => {
  return (
    <div className={cartPageCSS}>
      <div className={headerCSS}>SHOP</div>
      <div></div>
      <div className={orderConfirmCSS}>주문 확인</div>
    </div>
  );
};

export default CartPage;

const cartPageCSS = css`
  position: relative;
  width: 429px;
  height: 100vh;
  padding: 0 24px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const headerCSS = css`
  position: absolute;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 429px;
  height: 64px;
  padding: 0 24px;
  background: #000000;

  color: #ffffff;
  font-family: Noto Sans;
  font-size: 20px;
  font-weight: 800;
`;

const orderConfirmCSS = css`
  top: 872px;
  padding: 24px 65px;
  gap: 10px;

  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 429px;
  height: 64px;
  padding: 0 24px;
  background: #000000;

  color: #ffffff;
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 700;
`;
