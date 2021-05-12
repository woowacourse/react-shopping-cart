import React from 'react';
import Button from './index';
import { COLOR } from '../../../constants';

export default {
  title: 'components/shared/Button',
  component: Button,
};

const Template = args => <Button {...args} />;

export const deleteButton = Template.bind({});
export const OrderButton = Template.bind({});

deleteButton.args = {
  type: 'button',
  size: 'small',
  color: COLOR.BLACK,
  backgroundColor: COLOR.WHITE,
  borderColor: COLOR['GRAY-300'],
  children: '상품 삭제',
  onClick: () => {},
};

OrderButton.args = {
  type: 'button',
  size: 'medium',
  children: '10,000원 주문하기',
  onClick: () => {},
};
