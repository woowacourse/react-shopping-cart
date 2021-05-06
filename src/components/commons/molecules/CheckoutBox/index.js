import PropTypes from 'prop-types';
import { getFormattedAsKRW } from '../../../../utils';
import { Button, UnderlinedText } from '../../';
import * as Styled from './style.js';
import { baeminCyan } from '../../../../constants';

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
        <Button
          style={{
            fontSize: '1.5rem',
            backgroundColor: baeminCyan,
            color: '#ffffff',
            width: '100%',
            height: '4.5rem',
          }}
        >
          {buttonText}
        </Button>
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
