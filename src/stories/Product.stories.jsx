import React from 'react';

import Product from 'templates/Product';

export default {
  title: 'Template/Product',
  component: Product,
};

const Template = (args) => <Product {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  product_img_src:
    'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201704/10/8a043cc8-818b-4b85-a962-7914b83777de.jpg',
  product_title: '사나',
  product_price: 300000,
};
