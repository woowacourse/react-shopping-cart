import React from 'react';
import Product from '.';
import PALETTE from '../../../constants/palette';
import { mockData } from '../../../mockData';

export default {
  title: 'Shared/Product',
  component: Product,
  argTypes: {},
};

const Template = (args) => <Product {...args} />;

export const Column = Template.bind({});
Column.args = {
  product: mockData[0],
  size: '10rem',
  direction: 'column',
  productDetail: { text: '수량 : 1개' },
};

export const Row = Template.bind({});
Row.args = {
  product: mockData[0],
  size: '10rem',
  direction: 'row',
  productDetail: {
    text: '57,000원 / 수량 : 1개',
    fontSize: '1.5rem',
    color: PALETTE.GRAY_000,
  },
};
