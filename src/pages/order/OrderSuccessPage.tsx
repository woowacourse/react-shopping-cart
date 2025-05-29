import BackButton from '@/shared/components/BackButton/BackButton';
import * as S from './OrderSuccessPage.styled';
import Header from '@/shared/components/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ROUTES } from '@/shared/config/routes';
import { CartItemType } from '@/apis/cartItems/cartItem.type';

type OrderSuccessState = {
  orderList: CartItemType[];
  orderTotalPrice: number;
};

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderList, orderTotalPrice } = location.state as OrderSuccessState;
  const orderListType = orderList.length;
  const orderQuantity = orderList.reduce((acc, { quantity }) => (acc += quantity), 0);

  useEffect(() => {
    if (!location.state) {
      navigate(ROUTES.CART);
    }
  }, []);

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
            <S.OrderPriceText>{orderTotalPrice.toLocaleString()}원</S.OrderPriceText>
          </S.OrderPriceContainer>
        </S.OrderContainer>
        <S.PayConfirmButton disabled={true} type="button">
          결제하기
        </S.PayConfirmButton>
      </S.Container>
    </>
  );
}
