import React from 'react';

import Cart from 'templates/Cart';

export default {
  title: 'Template/Cart',
  template: Cart,
};

const cartProducts = [
  {
    cart_product_count: 1,
    product_id: 11,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/52e07957-c5ab-4f0c-862b-9dc6318dfffa.png',
    product_price: 1000,
    product_title: '엽서. 복',
  },
];

const Template = (args) => <Cart {...args} />;
const EmptyTemplate = (args) => <Cart {...args} />;

export const Primary = Template.bind({});
export const EmptyPrimary = EmptyTemplate.bind({});

Primary.args = {
  cartProducts,
};

cartProducts.splice(0, 1);

EmptyPrimary.args = {
  cartProducts,
};
