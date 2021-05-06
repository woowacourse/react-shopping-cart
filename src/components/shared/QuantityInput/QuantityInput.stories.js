import React from 'react';
import QuantityInput from './QuantityInput';

export default {
  title: 'shared/QuantityInput',
  component: QuantityInput,
};

const Template = (args) => <QuantityInput {...args} />;

export const Default = Template.bind({});
Default.args = {};
