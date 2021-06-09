import React from 'react';

import Button from '.';

import PALETTE from '../../../constants/palette';

export default {
  title: 'Common/Button',
  component: Button,
  argTypes: {},
};

const Template = (args) => <Button {...args} />;

export const Colored = Template.bind({});
Colored.args = {
  width: '388px',
  height: '73px',
  fontSize: '24px',
  backgroundColor: PALETTE.BAEMINT,
  color: PALETTE.WHITE,
  children: '상품삭제',
};

export const Bordered = Template.bind({});
Bordered.args = {
  width: '388px',
  height: '73px',
  fontSize: '24px',
  backgroundColor: 'transparent',
  borderColor: PALETTE.GRAY_002,
  color: PALETTE.BLACK,
  children: '상품삭제',
};
