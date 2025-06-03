import { PriceSummary } from '@/components/common/priceSummary';
import { CART_RULE } from '../../cart/constants/cartRule';

interface OrderPriceSummaryProps {
  value: number;
}

function OrderPriceSummary({ value }: OrderPriceSummaryProps) {
  const deliveryFee =
    value >= CART_RULE.freeDeliveryThreshold ? 0 : CART_RULE.defaultDeliveryFee;
  const totalPrice = value + deliveryFee;

  return (
    <PriceSummary
      notice={`총 주문 금액이 ${CART_RULE.freeDeliveryThreshold.toLocaleString()}원
            이상일 경우 무료 배송됩니다.`}
      items={[
        { label: '주문 금액', amount: value },
        { label: '쿠폰 할인 금액', amount: value, isDiscount: true },
        { label: '배송비', amount: deliveryFee },
      ]}
      total={{ label: '총 결제 금액', amount: totalPrice }}
    />
  );
}

export default OrderPriceSummary;
