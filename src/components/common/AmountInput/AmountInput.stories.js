import React from 'react';
import AmountInput from '.';

export default {
  title: 'Common/AmountInput',
  component: AmountInput,
  argTypes: {},
};

const Template = (args) => <AmountInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  amount: 1,
  setAmount: (amount) => console.log(amount),
};
