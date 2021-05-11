import PropTypes from 'prop-types';
import { UnderlinedText } from '../../';
import * as Styled from './style.js';

export const CheckoutBox = (props) => {
  const { title, label, price, buttonText, buttonDisabled, onClickButton, ...rest } = props;

  return (
    <Styled.Container {...rest}>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Content>
        <Styled.Bill>
          <UnderlinedText>{label}</UnderlinedText>
          <UnderlinedText>{price}</UnderlinedText>
        </Styled.Bill>
        <Styled.CheckoutButton disabled={buttonDisabled} onClick={onClickButton}>
          {buttonText}
        </Styled.CheckoutButton>
      </Styled.Content>
    </Styled.Container>
  );
};

CheckoutBox.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  buttonText: PropTypes.string,
  buttonDisabled: PropTypes.bool,
  onClickButton: PropTypes.func,
};
