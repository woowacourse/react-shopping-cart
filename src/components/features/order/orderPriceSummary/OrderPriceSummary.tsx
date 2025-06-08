import { PriceSummary } from '@/components/common';
import { CART_RULE } from '../../cart/constants/cartRule';

interface OrderPriceSummaryProps {
  orderPrice: number;
  discountAmount: number;
  deliveryFee: number;
  paymentPrice: number;
}

function OrderPriceSummary({
  orderPrice,
  discountAmount,
  deliveryFee,
  paymentPrice,
}: OrderPriceSummaryProps) {
  return (
    <PriceSummary
      notice={`총 주문 금액이 ${CART_RULE.freeDeliveryThreshold.toLocaleString()}원
            이상일 경우 무료 배송됩니다.`}
      items={[
        { label: '주문 금액', amount: orderPrice },
        { label: '쿠폰 할인 금액', amount: discountAmount, isDiscount: true },
        { label: '배송비', amount: deliveryFee },
      ]}
      total={{ label: '총 결제 금액', amount: paymentPrice }}
    />
  );
}

export default OrderPriceSummary;
