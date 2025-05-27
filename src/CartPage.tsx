import * as S from "./CartPage.styled";
import Header from "./components/Header/Header";
function CartPage() {
  return (
    <S.Root>
      <S.CartPageWrapper>
        <Header />
      </S.CartPageWrapper>
    </S.Root>
  );
}

export default CartPage;
