import CartPrice from './CartPrice';
import styled from '@emotion/styled';
import { CartPriceVariant } from './CartPrice';

interface CartFooterProps {
  price: number;
  shippingFee: number;
  totalPrice: number;
  couponDiscount?: number;
}

function CartFooter({ price, shippingFee, totalPrice, couponDiscount = 0 }: CartFooterProps) {
  const renderCartPrice = [
    { title: '주문 금액', price, variant: 'default' as CartPriceVariant },
    ...(couponDiscount > 0
      ? [
          {
            title: '쿠폰 할인 금액',
            price: -couponDiscount,
            variant: 'coupon' as CartPriceVariant,
          },
        ]
      : []),
    { title: '배송비', price: shippingFee, variant: 'shipping' as CartPriceVariant },
    { title: '총 결제 금액', price: totalPrice, variant: 'total' as CartPriceVariant },
  ];
  return (
    <Container>
      {renderCartPrice.map((render) => (
        <CartPrice
          key={render.title}
          title={render.title}
          price={render.price}
          variant={render.variant}
        />
      ))}
    </Container>
  );
}

export default CartFooter;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
