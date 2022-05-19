import styled from 'styled-components';
import theme from 'styles/theme';

import Button from './Button';
import PriceNotice from './PriceNotice';

interface PaymentBoxProps {
  title: string;
  priceDescription: string;
  price: number;
  buttonText: string;
}

const PaymentBox = ({ title, priceDescription, price, buttonText }: PaymentBoxProps) => {
  return (
    <StyledRoot>
      <PriceNotice title={title} priceDescription={priceDescription} price={price} />
      <Button
        color='white'
        fontSize='2.4rem'
        width='388px'
        height='73px'
        backgroundColor={theme.colors.primary}
      >
        {buttonText}
      </Button>
    </StyledRoot>
  );
};

export default PaymentBox;

const StyledRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.9rem 3rem 3.5rem;
  width: 44.8rem;
  height: 32.8rem;
  color: ${({ theme }) => theme.colors.font};
  border: 1px solid ${({ theme }) => theme.colors.boxBorder};
`;
