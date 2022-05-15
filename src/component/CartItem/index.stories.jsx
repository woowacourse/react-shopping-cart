import React from 'react';

import CartItem from 'component/CartItem';

export default {
  component: CartItem,
  title: 'CartItem',
};

const Template = (args) => <CartItem {...args} />;

export const Defaults = Template.bind({});
Defaults.args = {
  itemImgURL:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png',
  itemName: 'PET보틀-정사각(420ml)',
  itemPrice: '43,400',
};
