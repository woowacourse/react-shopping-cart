import PaymentAmount from './PaymentAmount';
import ShoppingList from './ShoppingList';
import * as S from './style';

function ShoppingCart() {
  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      <S.ProductAmount>든든배송 상품 (3개)</S.ProductAmount>
      <S.ShoppingCartContentsLayout>
        <ShoppingList />
        <PaymentAmount />
      </S.ShoppingCartContentsLayout>
    </S.Container>
  );
}

export default ShoppingCart;
