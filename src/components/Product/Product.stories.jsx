import React from 'react';
import Product from 'components/Product/index';

export default {
  title: 'Product',
  component: Product,
};

const Template = (args) => <Product {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: 1,
  thumbnail:
    'https://stickershop.line-scdn.net/stickershop/v1/product/789/LINEStorePC/main.png;compress=true',
  name: 'LINE 샐리 인형',
  price: 15000,
};
