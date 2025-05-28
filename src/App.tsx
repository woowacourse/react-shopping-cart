import { css } from "@emotion/react";
import Header from "./components/layout/Header/Header";
import Main from "./components/layout/Main/Main";
import CartProductContainer from "./components/CartProductContainer/CartProductContainer";
import { PaymentSummary } from "./components/PaymentSummary/PaymentSummary";
import Button from "./components/Button/Button";

const titleStyle = css`
  font-weight: 700;
  font-size: 24px;
`;

const subTitleStyle = css`
  font-weight: 500;
  font-size: 12px;
`;

const titleBox = css`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;

function App() {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      <div
        css={css`
          position: relative;
          width: 430px;
        `}
      >
        <Header>
          <p>SHOP</p>
        </Header>
        <Main>
          <div css={titleBox}>
            <p css={titleStyle}>장바구니</p>
            <p css={subTitleStyle}>현재 2종류의 상품이 담겨있습니다.</p>
          </div>
          <CartProductContainer />
          <PaymentSummary />
        </Main>
        <Button onClick={() => {}} type="submit" size="full">
          주문 확인
        </Button>
      </div>
    </div>
  );
}

export default App;
