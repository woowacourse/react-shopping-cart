import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import { Content, Header, Payment, Sheet, Line } from './index.styles';

const BUTTON_COLOR = 'var(--color-mint)';

const PaymentSheet = ({
  title,
  priceInfo,
  price,
  buttonText,
  onButtonClick = () => {},
}) => (
  <Sheet>
    <Header>{title}</Header>
    <Content>
      <Payment>
        <div>
          <span>{priceInfo}</span>
          <Line />
        </div>
        <div>
          <span>{price}원</span>
          <Line />
        </div>
      </Payment>
      <Button
        onClick={onButtonClick}
        backgroundColor={BUTTON_COLOR}
        disabled={price === '0'}
      >
        {buttonText}
      </Button>
    </Content>
  </Sheet>
);

PaymentSheet.propTypes = {
  title: PropTypes.string.isRequired,
  priceInfo: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func,
};

export default PaymentSheet;
