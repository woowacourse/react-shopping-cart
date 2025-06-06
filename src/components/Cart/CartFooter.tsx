import CartPrice from './CartPrice';
import styled from '@emotion/styled';
import { CartPriceVariant } from './CartPrice';

interface CartFooterProps {
  price: number;
  shippingFee: number;
  totalPrice: number;
}

function CartFooter({ price, shippingFee, totalPrice }: CartFooterProps) {
  const cartPriceItems: { title: string; price: number; variant: CartPriceVariant }[] = [
    { title: '주문 금액', price, variant: 'default' },
    { title: '배송비', price: shippingFee, variant: 'shipping' },
    { title: '총 결제 금액', price: totalPrice, variant: 'total' },
  ];
  return (
    <Container>
      {cartPriceItems.map((render) => (
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;
