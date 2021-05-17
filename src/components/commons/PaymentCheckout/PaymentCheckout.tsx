import Button from '../Button/Button';
import * as Styled from './PaymentCheckout.styles';

export interface Props {
  title: string;
  priceLabel: string;
  price: string;
  buttonText: string;
  isPayButtonDisabled?: boolean;
  onPayButtonClick?: () => void;
}

const PaymentCheckout = ({
  title,
  priceLabel,
  price,
  buttonText,
  onPayButtonClick,
  isPayButtonDisabled = false,
}: Props) => {
  return (
    <Styled.PaymentCheckout>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Container>
        <Styled.PriceWrapper>
          <Styled.PriceLabel>{priceLabel}</Styled.PriceLabel>
          <Styled.Price>{price}</Styled.Price>
        </Styled.PriceWrapper>
        <Button size="MD" onClick={onPayButtonClick} disabled={isPayButtonDisabled}>
          {buttonText}
        </Button>
      </Styled.Container>
    </Styled.PaymentCheckout>
  );
};

export default PaymentCheckout;
