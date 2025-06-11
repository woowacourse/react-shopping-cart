import BackButton from '@/shared/ui/BackButton/BackButton';
import { usePageNavigation } from '@app/hooks/usePageNavigation';
import Header from '@/shared/ui/Header/Header';
import * as S from './OrderPage.styled';
import OrderContent from '@widget/order/OrderContent/OrderContent';

export default function OrderPage() {
  const { getOrderSuccessState, navigateToCart } = usePageNavigation();

  const state = getOrderSuccessState();

  if (!state) {
    navigateToCart();
    return null;
  }

  const { orderItems } = state;

  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <S.Container>
        <S.Title>주문 확인</S.Title>
        <OrderContent orderItems={orderItems} />
      </S.Container>
    </>
  );
}
