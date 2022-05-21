import React from 'react';
import BoxButton from 'components/BoxButton';
import theme from 'style/theme';

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
    border: { controls: 'text' },
    fontColor: { controls: 'text' },
  },
};

const Template = (args) => <BoxButton {...args} />;

export const Delete = Template.bind({});
Delete.args = {
  color: '#FFF',
  message: '상품삭제',
  fontSize: '16px',
  width: '117px',
  height: '50px',
  border: '#BBB',
  fontColor: '#333',
};

export const Order = Template.bind({});
Order.args = {
  color: theme.mainColor,
  message: '주문하기',
  fontSize: '24px',
  width: '388px',
  height: '73px',
  fontColor: '#FFF',
};
