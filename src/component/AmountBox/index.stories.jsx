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
  totalCount: 2,
  totalPrice: 25000,
};

export const PayPrice = Template.bind({});
PayPrice.args = {
  type: 'pay',
  totalCount: '',
  totalPrice: 25000,
};
