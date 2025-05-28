import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import getShoppingCart from "./api/getShoppingCart";
import Button from "./components/Button/Button";
import CartProductContainer from "./components/CartProductContainer/CartProductContainer";

import Header from "./components/layout/Header/Header";
import Main from "./components/layout/Main/Main";
import { PaymentSummary } from "./components/PaymentSummary/PaymentSummary";
import { CartItemTypes } from "./types/cartItem";
import Toast from "./components/Toast/Toast";

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
  const [cartItem, setCartItem] = useState<CartItemTypes[]>([]);
  const [error, setError] = useState("");

  const [selectedCartId, setSelectedCartId] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCartId(cartItem.map((item) => item.id.toString()));
  }, [cartItem]);

  const getCartItemData = async () => {
    try {
      const response = await getShoppingCart();
      setCartItem(response);
    } catch (e) {
      setError("데이터를 가져오는데 실패했습니다");
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  useEffect(() => {
    getCartItemData();
  }, []);

  console.log(cartItem);
  console.log(selectedCartId);
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
          {Boolean(error) && <Toast>{error && error}</Toast>}
        </Header>
        <Main>
          <div css={titleBox}>
            <p css={titleStyle}>장바구니</p>
            <p css={subTitleStyle}>현재 2종류의 상품이 담겨있습니다.</p>
          </div>
          <CartProductContainer
            cartItem={cartItem}
            onChange={getCartItemData}
            onError={handleError}
            selectedCartId={selectedCartId}
            setSelectedCartId={setSelectedCartId}
          />
          <PaymentSummary
            cartItems={cartItem}
            selectedCartId={selectedCartId}
          />
          <Button
            onClick={() => {}}
            type="submit"
            size="full"
            style={
              selectedCartId.length === 0 || cartItem.length === 0
                ? "secondary"
                : "primary"
            }
            disabled={selectedCartId.length === 0 || cartItem.length === 0}
          >
            주문 확인
          </Button>
        </Main>
      </div>
    </div>
  );
}

export default App;
