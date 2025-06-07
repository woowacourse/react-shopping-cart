import { FooterButton } from '@/components/common';
import * as S from './PaymentCheckContents.styles';
import { useNavigate } from 'react-router';

interface PaymentCheckContentsProps {
  orderItemsQuantity: number;
  totalProductQuantity: number;
  paymentPrice: number;
}

function PaymentCheckContents({
  orderItemsQuantity,
  totalProductQuantity,
  paymentPrice,
}: PaymentCheckContentsProps) {
  const navigate = useNavigate();

  const moveToCart = () => {
    navigate('/cart');
  };

  return (
    <S.Container>
      <S.InfoBox>
        <S.Title>결제 확인</S.Title>
        <S.Description>
          총 {orderItemsQuantity}종류의 상품 {totalProductQuantity}개를
          주문했습니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </S.Description>
        <S.PriceBox>
          <S.PriceText>총 결제 금액</S.PriceText>
          <S.Price>{paymentPrice.toLocaleString()}원</S.Price>
        </S.PriceBox>
      </S.InfoBox>
      <FooterButton onClick={moveToCart}>장바구니로 돌아가기</FooterButton>
    </S.Container>
  );
}

export default PaymentCheckContents;
