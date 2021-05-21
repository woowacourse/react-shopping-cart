import React from 'react';
import NumericInput from '.';

export default {
  title: 'components/shared/NumericInput',
  component: NumericInput,
};

const Template = args => <NumericInput {...args} />;

export const Default = Template.bind({});

Default.args = {
  min: 1,
  max: 99,
  value: 1,
  setValue: () => {},
};
