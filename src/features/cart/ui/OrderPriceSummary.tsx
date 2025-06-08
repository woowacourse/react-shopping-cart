import { useSelectedCartItemsContext } from '../context/useSelectedCartItemsContext';
import OrderPriceItem from './OrderPriceItem';
import * as S from './OrderPriceSummary.styles';

interface OrderPriceSummaryProps {
  couponPriceItem?: boolean;
}

export default function OrderPriceSummary({ couponPriceItem }: OrderPriceSummaryProps) {
  const { totalPrice, deliveryFee, totalPurchasePrice, couponDiscountPrice } = useSelectedCartItemsContext();

  return (
    <S.OrderPriceSummaryContainer>
      <S.DeliveryFeeLabel>
        <S.DeliveryFeeIcon src="./infoLabelIcon.svg" alt="Delivery Fee Label Icon" />총 주문 금액이 100,000원 이상일
        경우 무료 배송됩니다.
      </S.DeliveryFeeLabel>
      <S.CalaculateList>
        <OrderPriceItem title="주문 금액" price={totalPrice} />
        {couponPriceItem && <OrderPriceItem title="쿠폰 할인 금액" price={couponDiscountPrice} />}
        <OrderPriceItem title="배송비" price={deliveryFee} data-testid="delivery-fee" />
      </S.CalaculateList>
      <OrderPriceItem title="총 결제 금액" price={totalPurchasePrice} data-testid="total-purchase-price" />
    </S.OrderPriceSummaryContainer>
  );
}
