import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { CheckBox } from "../../../components/CheckBox/CheckBox";
import Toast from "../../../components/Toast/Toast";
import { Footer } from "../../../layout/Footer/Footer";
import Header from "../../../layout/Header/Header";
import Main from "../../../layout/Main/Main";
import { PageLayout } from "../../../layout/PageLayout/PageLayout";
import { subTitleStyle, titleBox, titleStyle } from "../../common/common.style";
import { useCartContext } from "../../common/context/cartProvider";
import { useSelectedCartContext } from "../../common/context/selectedCartProvider";
import CartProductContainer from "../components/CartProductContainer/CartProductContainer";
import { EmptyShoppingCart } from "../components/EmptyShoppingCart/EmptyShoppingCart";
import { PaymentSummary } from "../components/PaymentSummary/PaymentSummary";
import { getOrderPrice } from "../../common/utils/getOrderPrice";
import {
  CartProductContainerLayout,
  SelectAllLayout,
} from "./shoppingCart.style";
import { getDeliveryFee } from "../../orderConfirm/utils/getDeliveryFee";
import { useErrorContext } from "../../../context/errorProvider";

export function ShoppingCart() {
  const isFirstMount = useRef(true);
  const navigate = useNavigate();

  const { deleteCartItem, cartItems } = useCartContext();
  const { error } = useErrorContext();
  const {
    toggleSelectAll,
    toggleCartItem,
    removeFromSelection,
    selectedCartIds,
  } = useSelectedCartContext();

  const orderPrice = getOrderPrice({ cartItems: cartItems, selectedCartIds });

  const handleConfirm = () => {
    navigate("/order-confirm");
  };

  useEffect(() => {
    if (isFirstMount.current && cartItems.length !== 0) {
      toggleSelectAll(cartItems, true);
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
            <div css={CartProductContainerLayout}>
              <div css={SelectAllLayout}>
                <CheckBox
                  checked={
                    selectedCartIds.length === cartItems.length &&
                    cartItems.length !== 0
                  }
                  dataTestId="select-all"
                  id="select-all"
                  onChange={() => toggleSelectAll(cartItems)}
                />
                <label htmlFor="select-all">전체 선택</label>
              </div>
              <CartProductContainer
                selectedCartIds={selectedCartIds}
                onDelete={async (id: string) => {
                  const response = await deleteCartItem(id);
                  if (response?.ok) {
                    removeFromSelection(id);
                  }
                }}
                handleCheckBox={(e: React.ChangeEvent<HTMLInputElement>) =>
                  toggleCartItem(e.target.id)
                }
              />
            </div>
            <PaymentSummary
              orderPrice={orderPrice}
              deliveryFee={getDeliveryFee({ orderPrice })}
              totalPrice={orderPrice + getDeliveryFee({ orderPrice })}
            />
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
