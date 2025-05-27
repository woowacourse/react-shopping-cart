import { Title, TotalContainer, TotalPrice } from './Cart.styles';

interface CartPriceProps {
  title: string;
  price: number;
}

function CartPrice({ title, price }: CartPriceProps) {
  return (
    <TotalContainer>
      <Title>{title}</Title>
      <TotalPrice>{price.toLocaleString()}원</TotalPrice>
    </TotalContainer>
  );
}

export default CartPrice;
