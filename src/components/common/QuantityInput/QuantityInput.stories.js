import React from 'react';

import QuantityInput from '.';

export default {
  title: 'Common/QuantityInput',
  component: QuantityInput,
  argTypes: {},
};

const Template = (args) => <QuantityInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  quantity: 1,
  setQuantity: (quantity) => console.log(quantity),
};
