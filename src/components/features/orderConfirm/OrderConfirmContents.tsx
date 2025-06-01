import FooterButton from '../../common/footerButton/FooterButton';
import * as S from './OrderConfirmContents.styles';

interface OrderConfirmContentsProps {
  orderItemsQuantity: number;
  totalProductQuantity: number;
  orderPrice: number;
}

function OrderConfirmContents({
  orderItemsQuantity,
  totalProductQuantity,
  orderPrice,
}: OrderConfirmContentsProps) {
  return (
    <S.Container>
      <S.InfoBox>
        <S.Title>주문 확인</S.Title>
        <S.Description>
          총 {orderItemsQuantity}종류의 상품 {totalProductQuantity}개를
          주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </S.Description>
        <S.PriceBox>
          <S.PriceText>총 결제 금액</S.PriceText>
          <S.Price>{orderPrice.toLocaleString()}원</S.Price>
        </S.PriceBox>
      </S.InfoBox>
      <FooterButton disabled onClick={() => {}}>
        결제하기
      </FooterButton>
    </S.Container>
  );
}

export default OrderConfirmContents;
