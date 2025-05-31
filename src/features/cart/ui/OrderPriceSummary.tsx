import { useSelectedCartContext } from '../../../shared/context/useSelectedCartContext';
import * as S from './OrderPriceSummary.styles';
export default function OrderPriceSummary() {
  const { selectedCartItems } = useSelectedCartContext();

  const totalPrice = selectedCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = totalPrice >= 100000 ? 0 : 3000;
  const totalPurchasePrice = totalPrice + deliveryFee;

  return (
    <S.OrderPriceSummaryContainer>
      <S.DeliveryFeeLabel>
        <S.DeliveryFeeIcon src='./infoLabelIcon.svg' alt='Delivery Fee Label Icon' />총 주문 금액이 100,000원 이상일
        경우 무료 배송됩니다.
      </S.DeliveryFeeLabel>
      <S.TotalOrderPrice>
        주문 금액
        <S.PriceBox>{totalPrice.toLocaleString()}원</S.PriceBox>
      </S.TotalOrderPrice>
      <S.DeliveryFee data-testid='delivery-fee'>
        배송비
        <S.PriceBox>{deliveryFee.toLocaleString()}원</S.PriceBox>
      </S.DeliveryFee>
      <S.TotalPurchasePrice data-testid='total-purchase-price'>
        총 결제 금액
        <S.PriceBox>{totalPurchasePrice.toLocaleString()}원</S.PriceBox>
      </S.TotalPurchasePrice>
    </S.OrderPriceSummaryContainer>
  );
}
