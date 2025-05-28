import * as S from "./CartPage.styled";
import CartItem from "./components/CartItem/CartItem";
import Header from "./components/Header/Header";
import OrderPriceSection from "./components/OrderPriceSection/OrderPriceSection";
import TitleSection from "./components/TitleSection/TitleSection";
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

  return (
    <S.Root>
      <S.CartPageWrapper>
        <Header />
        <S.Content>
          <TitleSection />
          <S.Line />
          {dummyItem.map((cart) => (
            <CartItem key={cart.product.id} cart={cart} />
          ))}
          <OrderPriceSection orderPrice={70000} deliveryPrice={3000} />
        </S.Content>
      </S.CartPageWrapper>
    </S.Root>
  );
}

export default CartPage;
