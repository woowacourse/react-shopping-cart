import styled from '@emotion/styled';
import { Title, TotalContainer, TotalPrice } from './Cart.styles';

export type CartPriceVariant = 'default' | 'shipping' | 'total';
interface CartPriceProps {
  title: string;
  price: number;
  variant: CartPriceVariant;
}

function CartPrice({ title, price, variant = 'default' }: CartPriceProps) {
  return (
    <StyledTotalContainer variant={variant}>
      <Title>{title}</Title>
      <TotalPrice>{price.toLocaleString()}원</TotalPrice>
    </StyledTotalContainer>
  );
}

export default CartPrice;

const StyledTotalContainer = styled(TotalContainer)<{ variant?: string }>`
  ${({ variant }) => {
    if (variant === 'default') {
      return `
        border-top: 1px solid #0000001A;
      `;
    }
    if (variant === 'shipping') {
      return `
        border-bottom: 1px solid #0000001A;
      `;
    }
    return '';
  }}
`;
