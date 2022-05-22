import React from 'react';

import Button from 'component/common/Button';
import theme from 'theme/theme';

export default {
  component: Button,
  title: 'Common/Button',
  argTypes: {
    type: {table: {disable: true}},
    onClick: {action: 'click', table: {disable: true}},
    width: {table: {disable: true}},
    height: {table: {disable: true}},
  },
};

const Template = (args) => <Button {...args} />;

export const Defaults = Template.bind({});
Defaults.args = {
  children: 'Default Button',
  backgroundColor: theme.GRAY_BROWN,
};

export const OrderButton = Template.bind({});
OrderButton.args = {
  children: '주문하기 (0개)',
  backgroundColor: theme.MINT,
  width: '223px',
  height: '73px',
};
