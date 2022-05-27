import React from 'react';

import Product from 'containers/Product';

export default {
  title: 'Container/Product',
  component: Product,
};

const Template = (args) => <Product {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  imgSrc: process.env.PUBLIC_URL + '/img/fallback.png',
  title: '상품',
  price: 300000,
};
