import { FREE_DELIVERY_LIMIT } from '@/entities/cart/utils/cartPriceCalculator';
import PriceBox from '@/shared/ui/PriceInfoContainer/PriceBox';
import PriceInfoContainer from '@/shared/ui/PriceInfoContainer';

interface PriceContainerProps {
  orderPrice: number;
  couponDiscountPrice: number;
  deliveryFee: number;
  orderTotalPrice: number;
}

export default function PriceContainer({
  orderPrice,
  couponDiscountPrice,
  deliveryFee,
  orderTotalPrice,
}: PriceContainerProps) {
  const orderItems = [
    { title: '주문 금액', price: orderPrice, testId: 'order-price' },
    {
      title: '쿠폰 할인 금액',
      price: couponDiscountPrice === 0 ? 0 : -couponDiscountPrice,
      testId: 'coupon-discount-price',
    },
    { title: '배송비', price: deliveryFee, testId: 'delivery-price' },
  ];

  const totalItems = [{ title: '총 결제 금액', price: orderTotalPrice, testId: 'payment-price' }];

  return (
    <PriceInfoContainer freeDeliveryLimit={FREE_DELIVERY_LIMIT}>
      <PriceBox items={orderItems} />
      <PriceBox items={totalItems} />
    </PriceInfoContainer>
  );
}
