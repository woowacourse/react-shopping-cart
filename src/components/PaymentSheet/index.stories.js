import React from 'react';
import PaymentSheet from './index.js';

export default {
  title: 'components/PaymentSheet',
  component: PaymentSheet,
};

export const Primary = args => <PaymentSheet {...args} />;

Primary.args = {
  title: '결제예정금액',
  priceInfo: '결제예정금액',
  price: 5000,
  buttonText: '주문하기',
};
