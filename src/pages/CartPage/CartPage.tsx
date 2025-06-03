import { useNavigate } from "react-router-dom";
import * as S from "./CartPage.styled";
import useCartManager from "../../hooks/useCartManager";
import Header from "../../components/Header/Header";
import TitleSection from "../../components/TitleSection/TitleSection";
import CartItem from "../../components/CartItem/CartItem";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartData,
    selectedCartItem,
    orderPrice,
    deliveryPrice,
    isCartEmpty,
    isLoading,
  } = useCartManager();

  const handleOrderCheck = (): void => {
    navigate("/order-complete", {
      state: {
        selectedCartItem,
        totalPrice: orderPrice + deliveryPrice,
        orderPrice,
        deliveryPrice,
      },
    });
  };

  if (isLoading || !cartData) {
    return <div>장바구니를 불러오는 중입니다...</div>;
  }

  return (
    <S.Root>
      <S.CartPageWrapper>
        <Header isOrderComplete={false} setIsOrderComplete={() => {}} />
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
        <S.OrderButton onClick={handleOrderCheck} disabled={orderPrice === 0}>
          주문 확인
        </S.OrderButton>
      </S.CartPageWrapper>
    </S.Root>
  );
};

export default CartPage;
