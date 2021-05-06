import React from 'react';
import Product from '.';
import { reactFamily } from '../../../mockData';

export default {
  title: 'Shared/Product',
  component: Product,
  argTypes: {},
};

const Template = (args) => <Product {...args} />;

export const Column = Template.bind({});
Column.args = {
  product: reactFamily[0],
  size: '10rem',
  direction: 'column',
  productDetail: '수량 : 1개',
};

export const Row = Template.bind({});
Row.args = {
  product: reactFamily[0],
  size: '10rem',
  direction: 'row',
  productDetail: '57,000원 / 수량 : 1개',
};
