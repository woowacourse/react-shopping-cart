import * as S from "./CartPage.styled";
import CartItem from "./components/CartItem/CartItem";
import Header from "./components/Header/Header";
function CartPage() {
  const dummyItem = {
    id: 1,
    quantity: 1,
    product: {
      id: 1,
      name: "test",
      price: 1000,
      imageUrl: "test",
      category: "test",
      quantity: 1,
    },
  };
  return (
    <S.Root>
      <S.CartPageWrapper>
        <Header />
        <CartItem cart={dummyItem} />
      </S.CartPageWrapper>
    </S.Root>
  );
}

export default CartPage;
