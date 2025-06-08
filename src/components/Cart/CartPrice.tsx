import styled from '@emotion/styled';

export type CartPriceVariant = 'default' | 'coupon' | 'shipping' | 'total';

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

export const Title = styled.h2`
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`;

export const TotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 54px;
  padding: 8px 0;
`;

const StyledTotalContainer = styled(TotalContainer)<{ variant?: string }>`
  ${({ variant }) => {
    if (variant === 'default') {
      return `
        border-top: 1px solid #0000001A;
      `;
    }

    if (variant === 'coupon') {
      return `
        border: none;
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

export const TotalPrice = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  text-align: right;
`;
