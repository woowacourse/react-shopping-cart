import { css } from "@emotion/react";
import Header from "./components/layout/Header/Header";
import Main from "./components/layout/Main/Main";
import CartProductContainer from "./components/CartProductContainer/CartProductContainer";
import { PaymentSummary } from "./components/PaymentSummary/PaymentSummary";
import Button from "./components/Button/Button";
import useCartItem from "./components/hooks/useCartItem";
import { useEffect } from "react";
import getShoppingCart from "./api/getShoppingCart";

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
  const { cartItem, dispatch } = useCartItem();

  const getCartItemData = async () => {
    try {
      dispatch({ type: "update" });
      const response = await getShoppingCart();
      dispatch({ type: "success", payload: response });
    } catch (e) {
      dispatch({
        type: "error",
        payload: "장바구니에 담긴 아이템을 가져오는 중 오류가 발생했습니다",
      });
    }
  };

  useEffect(() => {
    getCartItemData();
  }, []);

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
          <CartProductContainer cartItem={cartItem.item} />
          <PaymentSummary />
          <Button onClick={() => {}} type="submit" size="full">
            주문 확인
          </Button>
        </Main>
      </div>
    </div>
  );
}

export default App;
