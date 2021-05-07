import React from 'react';
import PropTypes from 'prop-types';
import { STYLE } from '../../constants';
import BoxButton from '../common/BoxButton';
import { Content, Header, Payment, Sheet } from './index.styles';

const PaymentSheet = ({ title, priceInfo, price, buttonText }) => (
  <Sheet>
    <Header>{title}</Header>
    <Content>
      <Payment>
        <div>
          <span>{priceInfo}</span>
          <span></span>
        </div>
        <div>
          <span>{price}원</span>
          <span></span>
        </div>
      </Payment>
      <BoxButton onClick={() => {}} buttonStyle={STYLE.BUTTON.MINT}>
        {buttonText}
      </BoxButton>
    </Content>
  </Sheet>
);

PaymentSheet.propTypes = {
  title: PropTypes.string.isRequired,
  priceInfo: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default PaymentSheet;
