import React from 'react';

import AmountBox from 'components/AmountBox';

export default {
  component: AmountBox,
  title: 'AmountBox',
};

const Template = (args) => <AmountBox {...args} />;

export const ExpectedPrice = Template.bind({});
ExpectedPrice.args = {
  type: 'cart',
  totalQuantity: 2,
  totalPrice: 3000,
};

export const PayPrice = Template.bind({});
PayPrice.args = {
  type: 'pay',
  totalPrice: 3000,
};
