import { useRecoilValue } from 'recoil';
import { totalPriceSelector } from 'recoil/cartList';
import * as S from './PaymentDetail.styles';

const PaymentDetail = () => {
  const deliveryPrice = 3000;
  const totalPrice = useRecoilValue(totalPriceSelector);
  const orderPrice = totalPrice === 0 ? 0 : totalPrice + deliveryPrice;

  return (
    <S.Container>
      <S.Title>결제 예상 금액</S.Title>
      <S.Wrapper>
        <S.Text>총 상품 가격</S.Text>
        <S.Text>{totalPrice.toLocaleString('KR')}원</S.Text>
      </S.Wrapper>
      <S.Wrapper>
        <S.Text>총 배송비</S.Text>
        <S.Text>{deliveryPrice.toLocaleString('KR')}원</S.Text>
      </S.Wrapper>
      <S.Wrapper>
        <S.Text>총 주문 금액</S.Text>
        <S.Text>{orderPrice.toLocaleString('KR')}원</S.Text>
      </S.Wrapper>
      <S.OrderButton>주문하기</S.OrderButton>
    </S.Container>
  );
};

export default PaymentDetail;
