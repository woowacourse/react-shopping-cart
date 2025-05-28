import * as S from './CartPage.styled';
import Header from '@/shared/components/Header/Header';
import EmptyCartContainer from './EmptyCartContainer/EmptyCartContainer';
import CardContainer from './CartContainer/CartContainer';
import { getCartItems } from '@/apis/cartItems/getCartItems';
import useFetchData from '@/shared/hooks/useFetchData';

function CartContent() {
  const {
    data: cartItems,
    isLoading,
    errorMessage,
    refetch: refetchCartItems,
  } = useFetchData({ fetchFn: getCartItems });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (errorMessage) {
    return <div>에러남</div>;
  }

  if (!cartItems?.length) {
    return <EmptyCartContainer />;
  }

  return <CardContainer cartItems={cartItems} refetchCartItems={refetchCartItems} />;
}

export default function CartPage() {
  return (
    <>
      <Header>SHOP</Header>
      <div>
        <S.Container>
          <S.Title>장바구니</S.Title>
          <CartContent />
        </S.Container>
        <button style={{ width: '100%', height: '64px', backgroundColor: 'black' }}>버튼</button>
      </div>
    </>
  );
}
