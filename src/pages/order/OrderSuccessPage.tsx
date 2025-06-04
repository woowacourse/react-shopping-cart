import BackButton from '@/shared/components/BackButton/BackButton';
import * as S from './OrderSuccessPage.styled';
import Header from '@/shared/components/Header/Header';
import { useEffect } from 'react';
import { usePageNavigation } from '@/shared/hooks/usePageNavigation';
import { ROUTES } from '@/shared/config/routes';

export default function OrderSuccessPage() {
  const { validateOrderSuccessState, navigateTo } = usePageNavigation();

  useEffect(() => {
    const state = validateOrderSuccessState();
    if (!state) {
      navigateTo(ROUTES.CART);
      return;
    }
  }, []);

  const state = validateOrderSuccessState();
  if (!state) return null;

  const { orderList, paymentAmount } = state;
  const orderListType = orderList.length;
  const orderQuantity = orderList.reduce((acc, { quantity }) => (acc += quantity), 0);

  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <S.Container>
        <S.OrderContainer>
          <S.Title>주문 확인</S.Title>
          <S.OrderText>
            총 {orderListType}종류의 상품 {orderQuantity}개를 주문합니다.
            <br />
            최종 결제 금액을 확인해 주세요.
          </S.OrderText>
          <S.OrderPriceContainer>
            <S.OrderPriceTitle>총 결제 금액</S.OrderPriceTitle>
            <S.OrderPriceText>{paymentAmount.toLocaleString()}원</S.OrderPriceText>
          </S.OrderPriceContainer>
        </S.OrderContainer>
        <S.PayConfirmButton disabled={true} type="button">
          결제하기
        </S.PayConfirmButton>
      </S.Container>
    </>
  );
}
