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
      imageUrl:
        "https://cdn.jsdelivr.net/gh/bunju20/bunju-blog-images@main/images/CleanShot%202025-05-27%20at%2017.25.21%402x.webp",
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
