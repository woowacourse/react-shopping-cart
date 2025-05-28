import { useContext } from "react";
import * as S from "./CartPage.styled";
import CartItem from "./components/CartItem/CartItem";
import Header from "./components/Header/Header";
import OrderPriceSection from "./components/OrderPriceSection/OrderPriceSection";
import OrderResult from "./components/OrderResult/OrderResult";
import TitleSection from "./components/TitleSection/TitleSection";
import CartContext from "./stores/CartContext";
function CartPage() {
  const dummyItem = Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    product: {
      id: index + 1,
      name: `상품 ${index + 1}`,
      price: (index + 1) * 10000,
      imageUrl: `https://cdn.jsdelivr.net/gh/bunju20/bunju-blog-images@main/images/CleanShot%202025-05-27%20at%2017.25.21%402x.webp`,
      quantity: index + 1,
      category: "식료품",
    },
    quantity: index + 1,
  }));

  const cart = useContext(CartContext);

  console.log(cart);
  const isCartEmpty = dummyItem.length === 0;
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
                {dummyItem.map((cart) => (
                  <CartItem key={cart.product.id} cart={cart} />
                ))}
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
