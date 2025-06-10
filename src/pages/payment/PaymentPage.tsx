import * as S from './PaymentPage.styled';
import Header from '@shared/components/Header/Header';
import { usePageNavigation } from '@app/hooks/usePageNavigation';
import BottomConfirmButton from '@shared/components/BottomConfirmButton/BottomConfirmButton';

export default function PaymentPage() {
  const { getPaymentSuccessState, navigateToCart } = usePageNavigation();

  const state = getPaymentSuccessState();

  if (!state) {
    navigateToCart();
    return null;
  }

  const { orderItems, orderTotalPrice } = state;
  const orderItemsType = orderItems.length;
  const orderTotalQuantity = orderItems.reduce((acc, { quantity }) => (acc += quantity), 0);

  return (
    <>
      <Header>{''}</Header>
      <S.Container>
        <S.OrderContainer>
          <S.Title>결제 확인</S.Title>
          <S.OrderText>
            총 {orderItemsType}종류의 상품 {orderTotalQuantity}개를 주문했습니다.
            <br />
            최종 결제 금액을 확인해 주세요.
          </S.OrderText>
          <S.OrderPriceContainer>
            <S.OrderPriceTitle>총 결제 금액</S.OrderPriceTitle>
            <S.OrderPriceText>{orderTotalPrice.toLocaleString()}원</S.OrderPriceText>
          </S.OrderPriceContainer>
        </S.OrderContainer>
        <BottomConfirmButton
          buttonText="장바구니로 돌아가기"
          disabled={false}
          onClick={navigateToCart}
        />
      </S.Container>
    </>
  );
}
