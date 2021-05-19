import React from 'react';
import Checkbox from '.';
import { mockData } from '../../../mockData';
import Product from '../../shared/Product';

export default {
  title: 'Common/Checkbox',
  component: Checkbox,
  argTypes: {},
};

const Template = (args) => <Checkbox {...args} />;

export const LabelCenter = Template.bind({});
LabelCenter.args = {
  children: '전체 선택',
  align: 'center',
};

export const LabelFlexStart = Template.bind({});
LabelFlexStart.args = {
  children: <Product product={mockData[0]} size="10rem" direction="row" />,
  align: 'flex-start',
};

export const Checked = Template.bind({});
Checked.args = {
  children: <Product product={mockData[0]} size="10rem" direction="row" />,
  align: 'flex-start',
  isChecked: true,
};
