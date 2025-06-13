import * as S from "./CartPage.styled";
import Header from "../../components/Header/Header";
import CartDataLoader from "./CartDataLoader";
import CartItemList from "./CartItemList";
import OrderSection from "./OrderSection";

const CartPage = () => {
  return (
    <S.Root>
      <S.CartPageWrapper>
        <Header showBackButton={true} onBackClick={() => {}} />
        <CartDataLoader>
          <S.CartContentWrapper>
            <S.HeaderTitle>장바구니</S.HeaderTitle>
            <CartItemList />
            <OrderSection />
          </S.CartContentWrapper>
        </CartDataLoader>
      </S.CartPageWrapper>
    </S.Root>
  );
};

export default CartPage;
