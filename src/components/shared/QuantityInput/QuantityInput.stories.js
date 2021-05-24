import React from 'react';
import QuantityInput from './QuantityInput';

export default {
  title: 'shared/QuantityInput',
  component: QuantityInput,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

const Template = (args) => <QuantityInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 1,
  min: 1,
  max: 99,
};
