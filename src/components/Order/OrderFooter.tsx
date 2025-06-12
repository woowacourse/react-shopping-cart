import { useOrder } from '../../context/OrderContext';
import styled from '@emotion/styled';
import CartPrice from '../Cart/CartPrice';
import { useCoupon } from '../../context/CouponContext';
import { useShipping } from '../../context/ShippingContext';

function OrderFooter() {
  const { price } = useOrder();
  const { totalDiscount } = useCoupon();
  const { calculateCouponShippingFee } = useShipping();

  const cartPriceItems = [
    { title: '주문 금액', price, variant: 'default' as const },
    ...(totalDiscount
      ? [
          {
            title: '쿠폰 할인 금액',
            price: totalDiscount,
            variant: 'coupon' as const,
          },
        ]
      : []),
    {
      title: '배송비',
      price: calculateCouponShippingFee(price, false),
      variant: 'shipping' as const,
    },
    {
      title: '총 결제 금액',
      price: price - totalDiscount + calculateCouponShippingFee(price, false),
      variant: 'total' as const,
    },
  ];

  return (
    <Container>
      {cartPriceItems.map((item) => (
        <CartPrice key={item.title} title={item.title} price={item.price} variant={item.variant} />
      ))}
    </Container>
  );
}
export default OrderFooter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
