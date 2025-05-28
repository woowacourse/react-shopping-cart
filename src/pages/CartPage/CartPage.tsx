import { useEffect, useMemo, useState } from "react";
import * as S from "./CartPage.styled";
import { useCartContext, useCartDispatch } from "../../stores/CartContext";
import {
  useSelectContext,
  useSelectDispatch,
} from "../../stores/SelectContext";
import useCart from "../../hooks/useCart";
import Header from "../../components/Header/Header";
import OrderResult from "../../components/OrderResult/OrderResult";
import TitleSection from "../../components/TitleSection/TitleSection";
import CartItem from "../../components/CartItem/CartItem";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";

function CartPage() {
  const dispatch = useCartDispatch();
  const selectDispatch = useSelectDispatch();
  const selectData = useSelectContext();
  const cartData = useCartContext();
  const { cartItemList: cartItemRes, isLoading } = useCart();

  useEffect(() => {
    if (cartItemRes.length > 0) {
      dispatch({
        type: "SET_CART",
        payload: { items: cartItemRes },
      });

      selectDispatch({
        type: "SET_SELECT",
        payload: { items: cartItemRes },
      });
    }
  }, [cartItemRes, dispatch, selectDispatch]);

  const isCartEmpty = cartData.length === 0;
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const handleOrderCheck = () => {
    setIsOrderComplete(true);
  };

  const { orderPrice, deliveryPrice } = useMemo(() => {
    const calculatedOrderPrice = selectData.reduce((total, item, idx) => {
      if (item.selected) {
        return total + cartData[idx].product.price * cartData[idx].quantity;
      }
      return total;
    }, 0);

    let calculatedDeliveryPrice = 0;
    if (calculatedOrderPrice >= 100000 || calculatedOrderPrice === 0) {
      calculatedDeliveryPrice = 0;
    } else {
      calculatedDeliveryPrice = 3000;
    }

    return {
      orderPrice: calculatedOrderPrice,
      deliveryPrice: calculatedDeliveryPrice,
    };
  }, [selectData, cartData]);

  const selectedCartItem = useMemo(() => {
    return cartData.filter((_, idx) => selectData[idx].selected);
  }, [cartData, selectData]);

  if (isLoading || !cartData) {
    return <div>장바구니를 불러오는 중입니다...</div>;
  }

  return (
    <S.Root>
      <S.CartPageWrapper>
        <Header isCartComplete={isOrderComplete} />
        {isOrderComplete ? (
          <OrderResult
            selectedCartItem={selectedCartItem}
            totalPrice={orderPrice + deliveryPrice}
          />
        ) : (
          <S.CartContentWrapper>
            <S.HeaderTitle>장바구니</S.HeaderTitle>
            {isCartEmpty ? (
              <S.EmptyCart>장바구니에 담은 상품이 없습니다.</S.EmptyCart>
            ) : (
              <S.Content>
                <TitleSection />
                <S.CartItemList>
                  {cartData.map((cart) => (
                    <CartItem key={cart.product.id} cart={cart} />
                  ))}
                </S.CartItemList>
                <S.Description>
                  ⚠️ 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
                </S.Description>
                <S.Line />
                <OrderPriceSection
                  orderPrice={orderPrice}
                  deliveryPrice={deliveryPrice}
                />
              </S.Content>
            )}
          </S.CartContentWrapper>
        )}
        <S.OrderButton
          onClick={handleOrderCheck}
          disabled={orderPrice === 0 || isOrderComplete}
        >
          주문확인
        </S.OrderButton>
      </S.CartPageWrapper>
    </S.Root>
  );
}

export default CartPage;
