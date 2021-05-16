import PropTypes from 'prop-types';
import { Container, Title, Content, PaymentDetail, PaymentButton } from './PaymentInfoBox.styles';

const PaymentInfoBox = ({ title, detailText, price, buttonText, onClickPaymentButton, isPaymentButtonDisable }) => (
  <Container>
    <Title>{title}</Title>
    <Content>
      <PaymentDetail>
        <span>{detailText}</span>
        <span>{price}</span>
      </PaymentDetail>
      <PaymentButton onClick={onClickPaymentButton} disabled={isPaymentButtonDisable}>
        {buttonText}
      </PaymentButton>
    </Content>
  </Container>
);

PaymentInfoBox.propTypes = {
  title: PropTypes.string.isRequired,
  detailText: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClickPaymentButton: PropTypes.func.isRequired,
  isPaymentButtonDisable: PropTypes.bool,
};

PaymentInfoBox.defaultProps = {
  isPaymentButtonDisable: false,
};

export default PaymentInfoBox;
