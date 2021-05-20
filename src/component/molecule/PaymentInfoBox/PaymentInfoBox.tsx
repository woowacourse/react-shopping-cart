import {
  Container,
  Title,
  Content,
  PaymentDetail,
  PaymentButton,
} from './PaymentInfoBox.styles';

interface PaymentInfoBoxProps {
  title: string;
  detailText: string;
  price: string;
  buttonText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisable?: boolean;
}

const PaymentInfoBox = ({
  title,
  detailText,
  price,
  buttonText = '',
  onClick = () => {},
  isDisable = false,
}: PaymentInfoBoxProps) => (
  <Container>
    <Title>{title}</Title>
    <Content>
      <PaymentDetail>
        <span>{detailText}</span>
        <span>{price}</span>
      </PaymentDetail>
      {buttonText && (
        <PaymentButton onClick={onClick} disabled={isDisable}>
          {buttonText}
        </PaymentButton>
      )}
    </Content>
  </Container>
);

export default PaymentInfoBox;
export type { PaymentInfoBoxProps };
