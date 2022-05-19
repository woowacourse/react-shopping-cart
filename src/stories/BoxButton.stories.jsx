import React from 'react';
import BoxButton from 'components/BoxButton';

export default {
  title: 'Component/BoxButton',
  component: BoxButton,
  argTypes: {
    message: { controls: 'text' },
    fontSize: { controls: 'text' },
    fontWeight: { controls: 'number' },
    width: { controls: 'text' },
    height: { controls: 'text' },
  },
};

const Template = (args) => <BoxButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  message: 'button',
  fontSize: '20px',
  fontWeight: 400,
  width: '100px',
  height: '50px',
};
