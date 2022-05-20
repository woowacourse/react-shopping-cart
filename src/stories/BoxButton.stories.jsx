import React from 'react';
import BoxButton from 'components/BoxButton';

export default {
  title: 'Component/BoxButton',
  component: BoxButton,
  argTypes: {
    color: { controls: 'text' },
    message: { controls: 'text' },
    fontSize: { controls: 'text' },
    fontWeight: { controls: 'number' },
    width: { controls: 'text' },
    height: { controls: 'text' },
  },
};

const Template = (args) => <BoxButton {...args} />;

export const Cart = Template.bind({});
Cart.args = {
  color: '#FFC9C9',
  message: '장바구니 담기',
  fontSize: '15px',
  width: '100px',
  height: '50px',
};

export const Cancel = Template.bind({});
Cancel.args = {
  message: '삭제',
  fontSize: '15px',
  width: '100px',
  height: '50px',
};
