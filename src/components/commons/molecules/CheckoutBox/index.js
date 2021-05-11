import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UnderlinedText } from '../../';
import * as Styled from './style.js';

export const CheckoutBox = (props) => {
  const { title, label, price, buttonText, buttonDisabled, route, ...rest } = props;

  return (
    <Styled.Container {...rest}>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Content>
        <Styled.Bill>
          <UnderlinedText>{label}</UnderlinedText>
          <UnderlinedText>{price}</UnderlinedText>
        </Styled.Bill>
        <Link to={route}>
          <Styled.CheckoutButton disabled={buttonDisabled}>{buttonText}</Styled.CheckoutButton>
        </Link>
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
  route: PropTypes.string,
};
