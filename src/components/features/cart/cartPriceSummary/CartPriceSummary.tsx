import { PriceSummary } from '@/components/common';
import { CART_RULE } from '../constants/cartRule';

interface CartPriceSummaryProps {
  value: number;
}

function CartPriceSummary({ value }: CartPriceSummaryProps) {
  const deliveryFee =
    value >= CART_RULE.freeDeliveryThreshold ? 0 : CART_RULE.defaultDeliveryFee;
  const totalPrice = value + deliveryFee;

  return (
    <PriceSummary
      notice={`총 주문 금액이 ${CART_RULE.freeDeliveryThreshold.toLocaleString()}원
          이상일 경우 무료 배송됩니다.`}
      items={[
        { label: '주문 금액', amount: value },
        { label: '배송비', amount: deliveryFee },
      ]}
      total={{ label: '총 결제 금액', amount: totalPrice }}
    />
  );
}

export default CartPriceSummary;
