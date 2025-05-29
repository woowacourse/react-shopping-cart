import { useState } from "react";
import * as S from "./CartPage.styled";
import useCartManager from "../../hooks/useCartManager";
import Header from "../../components/Header/Header";
import OrderResult from "../../components/OrderResult/OrderResult";
import TitleSection from "../../components/TitleSection/TitleSection";
import CartItem from "../../components/CartItem/CartItem";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";

const CartPage = () => {
  const {
    cartData,
    selectedCartItem,
    orderPrice,
    deliveryPrice,
    isCartEmpty,
    isLoading,
  } = useCartManager();

  const [isOrderComplete, setIsOrderComplete] = useState<boolean>(false);

  const handleOrderCheck = (): void => {
    setIsOrderComplete(true);
  };

  if (isLoading || !cartData) {
    return <div>장바구니를 불러오는 중입니다...</div>;
  }

  return (
    <S.Root>
      <S.CartPageWrapper>
        <Header
          isOrderComplete={isOrderComplete}
          setIsOrderComplete={setIsOrderComplete}
        />
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
          {isOrderComplete ? "결제하기" : "주문 확인"}
        </S.OrderButton>
      </S.CartPageWrapper>
    </S.Root>
  );
};

export default CartPage;
