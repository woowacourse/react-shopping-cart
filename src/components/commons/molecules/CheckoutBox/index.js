import PropTypes from 'prop-types';
import { getFormattedAsKRW } from '../../../../utils';
import { UnderlinedText } from '../../';
import * as Styled from './style.js';

export const CheckoutBox = (props) => {
  const { title, label, price, buttonText } = props;

  return (
    <Styled.Container>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Content>
        <Styled.Bill>
          <UnderlinedText>{label}</UnderlinedText>
          <UnderlinedText>{getFormattedAsKRW(price)}</UnderlinedText>
        </Styled.Bill>
        <Styled.CheckoutButton>{buttonText}</Styled.CheckoutButton>
      </Styled.Content>
    </Styled.Container>
  );
};

CheckoutBox.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  buttonText: PropTypes.string,
};
