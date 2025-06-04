import FooterButton from '../../common/footerButton/FooterButton';
import useOrderSummary from './hooks/useOrderSummary';
import * as S from './OrderConfirmContents.styles';

function OrderConfirmContents() {
  const order = useOrderSummary();

  return (
    <S.Container>
      <S.InfoBox>
        <S.Title>주문 확인</S.Title>
        <S.Description>
          총 {order.quantity}종류의 상품 {order.totalProductQuantity}개를
          주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </S.Description>
        <S.PriceBox>
          <S.PriceText>총 결제 금액</S.PriceText>
          <S.Price>{order.totalPrice.toLocaleString()}원</S.Price>
        </S.PriceBox>
      </S.InfoBox>
      <FooterButton disabled onClick={() => {}}>
        결제하기
      </FooterButton>
    </S.Container>
  );
}

export default OrderConfirmContents;
