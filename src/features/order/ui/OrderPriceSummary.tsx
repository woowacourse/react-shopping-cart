import { useOrderContext } from '../context/useOrderContext';
import InfoLabel from '../../../shared/ui/InfoLabel';
import OrderPriceItem from './OrderPriceItem';
import * as S from './OrderPriceSummary.styles';

interface OrderPriceSummaryProps {
  couponPriceItem?: boolean;
}

export default function OrderPriceSummary({ couponPriceItem }: OrderPriceSummaryProps) {
  const { totalPrice, deliveryFee, totalPurchasePrice, couponDiscountPrice } = useOrderContext();

  return (
    <S.OrderPriceSummaryContainer>
      <InfoLabel description="총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다." />
      <S.CalaculateList>
        <OrderPriceItem title="주문 금액" price={totalPrice} />
        {couponPriceItem && <OrderPriceItem title="쿠폰 할인 금액" price={couponDiscountPrice} />}
        <OrderPriceItem title="배송비" price={deliveryFee} data-testid="delivery-fee" />
      </S.CalaculateList>
      <OrderPriceItem title="총 결제 금액" price={totalPurchasePrice} data-testid="total-purchase-price" />
    </S.OrderPriceSummaryContainer>
  );
}
