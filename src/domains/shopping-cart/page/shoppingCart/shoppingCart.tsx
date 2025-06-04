import { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import Toast from "../../../../components/Toast/Toast";
import { Footer } from "../../../../layout/Footer/Footer";
import Header from "../../../../layout/Header/Header";
import Main from "../../../../layout/Main/Main";
import { PageLayout } from "../../../../layout/PageLayout/PageLayout";
import { EmptyShoppingCart } from "../../../orderConfirm/compoennt/EmptyShoppingCart/EmptyShoppingCart";
import CartProductContainer from "../../components/CartProductContainer/CartProductContainer";
import { PaymentSummary } from "../../components/PaymentSummary/PaymentSummary";
import { useSelectedCartIds } from "../../hooks/useSelectedCartIds";
import { useShoppingCartApi } from "../../hooks/useShoppingCartApi";
import { getTotalPrice } from "../../utils/getTotalPrice/getTotalPrice";
import { subTitleStyle, titleBox, titleStyle } from "./shoppingCart.style";

export function ShoppingCart() {
  const { getCartItemData, setError, cartItem, error, isLoading } =
    useShoppingCartApi();
  const isFirstMount = useRef(true);

  const {
    calculateCartItemQuantity,
    selectAllCartItems,
    selectedCartIds,
    setSelectedCartIds,
  } = useSelectedCartIds(cartItem);

  const navigate = useNavigate();

  const totalPrice = getTotalPrice({ cartItems: cartItem, selectedCartIds });

  const handleConfirm = () => {
    navigate("/confirm", {
      state: {
        selectedCartType: selectedCartIds.length,
        selectedCartItem: calculateCartItemQuantity(),
        totalPrice,
      },
    });
  };

  useEffect(() => {
    if (isFirstMount.current && cartItem.length !== 0) {
      selectAllCartItems();
      isFirstMount.current = false;
    }
  }, [isFirstMount, cartItem]);

  console.log("장바구니 데이터", selectedCartIds);
  return (
    <PageLayout>
      <Header>
        <p>SHOP</p>
        {Boolean(error) && <Toast>{error && error}</Toast>}
      </Header>
      <Main>
        <div css={titleBox}>
          <p css={titleStyle}>장바구니</p>
          {cartItem.length !== 0 && (
            <p css={subTitleStyle}>현재 2종류의 상품이 담겨있습니다.</p>
          )}
        </div>
        {cartItem.length === 0 ? (
          <EmptyShoppingCart />
        ) : (
          <>
            <CartProductContainer
              cartItem={cartItem}
              onChange={getCartItemData}
              onError={(errorMessage) => setError(errorMessage)}
              selectedCartIds={selectedCartIds}
              setSelectedCartIds={setSelectedCartIds}
            ></CartProductContainer>
            <PaymentSummary price={totalPrice} />
          </>
        )}
      </Main>
      <Footer>
        <Button
          onClick={handleConfirm}
          type="submit"
          size="full"
          style={
            selectedCartIds.length === 0 || cartItem.length === 0
              ? "secondary"
              : "primary"
          }
          disabled={selectedCartIds.length === 0 || cartItem.length === 0}
        >
          주문 확인
        </Button>
      </Footer>
    </PageLayout>
  );
}
