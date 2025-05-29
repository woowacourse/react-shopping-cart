import * as S from './CartPage.styled';
import Header from '@/shared/components/Header/Header';
import CartContent from './CartContent/CartContent';

export default function CartPage() {
  return (
    <>
      <Header>SHOP</Header>
      <S.Container>
        <S.Title>장바구니</S.Title>
        <CartContent />
      </S.Container>
    </>
  );
}
