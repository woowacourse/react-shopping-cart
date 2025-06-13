import styled from '@emotion/styled';
import CartPrice from '../Cart/CartPrice';
import { useCoupon } from '../../context/CouponContext';
import { calculateShippingFee } from '../../utils/calculator';
import { useShipping } from '../../context/ShippingContext';
import { useOrderSummary } from '../../hooks/useOrderSummary';

function OrderFooter() {
  const { price } = useOrderSummary();

  const { totalDiscount } = useCoupon();
  const { isExtraShippingFee } = useShipping();

  const cartPriceItems = [
    { title: '주문 금액', price, variant: 'default' as const },
    ...(totalDiscount
      ? [
          {
            title: '쿠폰 할인 금액',
            price: isExtraShippingFee ? totalDiscount + 3000 : totalDiscount,
            variant: 'coupon' as const,
          },
        ]
      : []),
    {
      title: '배송비',
      price: calculateShippingFee({ price, hasItems: true, isExtraShippingFee }),
      variant: 'shipping' as const,
    },
    {
      title: '총 결제 금액',
      price:
        price -
        totalDiscount +
        calculateShippingFee({ price, hasItems: false, isExtraShippingFee }),
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
