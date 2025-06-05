import * as S from "./CartPage.styled";
import useCartManager from "../../hooks/useCartManager";
import Header from "../../components/Header/Header";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";
import { useNavigate } from "react-router-dom";
import CartList from "../../components/CartList/CartList";

const CartPage = () => {
  const { selectedCartItem, orderPrice, deliveryPrice, isCartEmpty } =
    useCartManager();

  const navigate = useNavigate();

  const handleOrderCheck = (): void => {
    navigate("/complete", {
      state: {
        selectedCartItem,
        totalPrice: orderPrice + deliveryPrice,
      },
    });
  };

  return (
    <S.Root>
      <S.CartPageWrapper>
        <Header>
          <S.HeaderTitle>SHOP</S.HeaderTitle>
        </Header>
        <S.CartContentWrapper>
          <S.HeaderTitle>장바구니</S.HeaderTitle>
          {isCartEmpty ? (
            <S.EmptyCart>장바구니에 담은 상품이 없습니다.</S.EmptyCart>
          ) : (
            <S.Content>
              <CartList />
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
        <S.OrderButton
          onClick={handleOrderCheck}
          disabled={selectedCartItem.length === 0}
        >
          결제하기
        </S.OrderButton>
      </S.CartPageWrapper>
    </S.Root>
  );
};

export default CartPage;
