import React from 'react';

import AmountBox from 'component/AmountBox';

export default {
  component: AmountBox,
  title: 'AmountBox',
};

const Template = (args) => <AmountBox {...args} />;

export const ExpectedPrice = Template.bind({});
ExpectedPrice.args = {
  type: 'expect',
  totalQuantity: '2',
  totalPrice: '12340',
};

export const PayPrice = Template.bind({});
PayPrice.args = {
  type: 'pay',
  totalQuantity: '',
  totalPrice: '325600',
};
