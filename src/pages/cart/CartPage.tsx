import * as S from './CartPage.styled';
import Header from '@/shared/components/Header/Header';
import CartContent from '@widget/cart/CartContent/CartContent';
import { CartProvider } from '@entities/cart';

const CartPageContent = () => {
  return (
    <>
      <Header>SHOP</Header>
      <S.Container>
        <S.Title>장바구니</S.Title>
        <CartContent />
      </S.Container>
    </>
  );
};

export default function CartPage() {
  return (
    <CartProvider>
      <CartPageContent />
    </CartProvider>
  );
}
