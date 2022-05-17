import React from 'react';

import Product from 'components/Product';

export default {
  title: 'Template/Product',
  component: Product,
};

const Template = (args) => <Product {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  imgSrc:
    'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201704/10/8a043cc8-818b-4b85-a962-7914b83777de.jpg',
  title: '사나',
  price: 300000,
};
