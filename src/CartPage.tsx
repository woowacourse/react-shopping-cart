import { useEffect } from "react";
import * as S from "./CartPage.styled";
import CartItem from "./components/CartItem/CartItem";
import Header from "./components/Header/Header";
import OrderPriceSection from "./components/OrderPriceSection/OrderPriceSection";
import OrderResult from "./components/OrderResult/OrderResult";
import TitleSection from "./components/TitleSection/TitleSection";
import { useCartContext, useCartDispatch } from "./stores/CartContext";
import useCart from "./hooks/useCart";

function CartPage() {
  const cartItemList = useCartContext();
  const dispatch = useCartDispatch();
  const { cartItemList: cartData } = useCart();
  console.log(cartData);

  useEffect(() => {
    dispatch({
      type: "SET_CART",
      payload: { items: cartData },
    });
  }, [cartItemList, dispatch]);

  const isCartEmpty = cartItemList.length === 0;
  const isOrderComplete = false;

  return (
    <S.Root>
      <S.CartPageWrapper>
        <Header isCartComplete={isOrderComplete} />
        {isOrderComplete ? (
          <OrderResult />
        ) : (
          <S.CartContentWrapper>
            <S.HeaderTitle>장바구니</S.HeaderTitle>
            {isCartEmpty ? (
              <S.EmptyCart>장바구니에 담은 상품이 없습니다.</S.EmptyCart>
            ) : (
              <S.Content>
                <TitleSection />
                <S.CartItemList>
                  {cartItemList.map((cart) => (
                    <CartItem key={cart.product.id} cart={cart} />
                  ))}
                </S.CartItemList>
                <S.Description>
                  ⚠️ 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
                </S.Description>
                <S.Line />
                <OrderPriceSection orderPrice={70000} deliveryPrice={3000} />
              </S.Content>
            )}
          </S.CartContentWrapper>
        )}
        <S.OrderButton>주문확인</S.OrderButton>
      </S.CartPageWrapper>
    </S.Root>
  );
}

export default CartPage;
