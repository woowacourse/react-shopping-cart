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
import { CartProvider, useCart } from "../../context/cartProvider";
import { useSelectedCartIds } from "../../hooks/useSelectedCartIds";
import { getTotalPrice } from "../../utils/getTotalPrice/getTotalPrice";
import { subTitleStyle, titleBox, titleStyle } from "./shoppingCart.style";

export function ShoppingCart() {
  const isFirstMount = useRef(true);
  const navigate = useNavigate();

  const { getCartItemData, deleteCartItem, cartItems, error } = useCart();

  const {
    toggleSelectAll,
    toggleCartItem,
    removeFromSelection,
    selectedCartIds,
  } = useSelectedCartIds(cartItems);

  const totalPrice = getTotalPrice({ cartItems: cartItems, selectedCartIds });

  const calculateCartItemQuantity = () => {
    return cartItems.reduce((totalQuantity, item) => {
      if (selectedCartIds.includes(item.id.toString()))
        return totalQuantity + item.quantity;
      return totalQuantity;
    }, 0);
  };

  const handleConfirm = () => {
    navigate("/confirm", {
      state: {
        selectedCartType: selectedCartIds.length,
        selectedCartItem: calculateCartItemQuantity(),
        totalPrice,
      },
    });
  };

  const handleCheckBox = (id: string) => {
    if (id === "select-all") return toggleSelectAll();
    else toggleCartItem(id);
  };

  useEffect(() => {
    if (isFirstMount.current && cartItems.length !== 0) {
      toggleSelectAll();
      isFirstMount.current = false;
    }
  }, [isFirstMount, cartItems]);

  return (
    <PageLayout>
      <Header>
        <p>SHOP</p>
        {Boolean(error) && <Toast>{error && error}</Toast>}
      </Header>
      <Main>
        <div css={titleBox}>
          <p css={titleStyle}>장바구니</p>
          {cartItems.length !== 0 && (
            <p css={subTitleStyle}>현재 2종류의 상품이 담겨있습니다.</p>
          )}
        </div>
        {cartItems.length === 0 ? (
          <EmptyShoppingCart />
        ) : (
          <>
            <CartProductContainer
              selectedCartIds={selectedCartIds}
              onDelete={async (id: string) => {
                const response = await deleteCartItem(id);
                if (response?.ok) {
                  removeFromSelection(id);
                  getCartItemData();
                }
              }}
              handleCheckBox={handleCheckBox}
            />
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
            selectedCartIds.length === 0 || cartItems.length === 0
              ? "secondary"
              : "primary"
          }
          disabled={selectedCartIds.length === 0 || cartItems.length === 0}
        >
          주문 확인
        </Button>
      </Footer>
    </PageLayout>
  );
}
