import { PriceSummary } from '@/components/common/priceSummary';
import { CART_RULE } from '../../cart/constants/cartRule';
import { calculateDeliveryFee } from '../../cart/utils/calculateDeliveryFee';

interface OrderPriceSummaryProps {
  orderPrice: number;
  discountAmount: number;
  isRemoteArea: boolean;
}

function OrderPriceSummary({
  orderPrice,
  discountAmount,
  isRemoteArea,
}: OrderPriceSummaryProps) {
  const deliveryFee = calculateDeliveryFee(orderPrice, isRemoteArea);
  const totalPrice = orderPrice - discountAmount + deliveryFee;

  return (
    <PriceSummary
      notice={`총 주문 금액이 ${CART_RULE.freeDeliveryThreshold.toLocaleString()}원
            이상일 경우 무료 배송됩니다.`}
      items={[
        { label: '주문 금액', amount: orderPrice },
        { label: '쿠폰 할인 금액', amount: discountAmount, isDiscount: true },
        { label: '배송비', amount: deliveryFee },
      ]}
      total={{ label: '총 결제 금액', amount: totalPrice }}
    />
  );
}

export default OrderPriceSummary;
