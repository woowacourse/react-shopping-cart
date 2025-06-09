import CartPrice from './CartPrice';
import styled from '@emotion/styled';

interface CartFooterProps {
  price: number;
  shippingFee: number;
  totalPrice: number;
  couponDiscount?: number;
}

function CartFooter({ price, shippingFee, totalPrice, couponDiscount = 0 }: CartFooterProps) {
  const isZero = (value: number) => {
    if (value === 0) {
      return 0;
    }

    if (value > 0) {
      return `-${couponDiscount}`;
    }
  };

  const renderCartPrice = [
    { title: '주문 금액', price, variant: 'default' as const },
    {
      title: '쿠폰 할인 금액',
      price: isZero(couponDiscount),
      variant: 'coupon' as const,
    },
    { title: '배송비', price: shippingFee, variant: 'shipping' as const },
    { title: '총 결제 금액', price: totalPrice, variant: 'total' as const },
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
  margin: 0 0 16px 0;
`;
