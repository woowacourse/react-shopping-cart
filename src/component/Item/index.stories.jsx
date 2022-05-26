import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Item from 'component/Item';
import {MOCK_PRODUCT_LIST} from 'mocks/mockData';

export default {
  component: Item,
  title: 'Item',
};

const Template = (args) => (
  <BrowserRouter>
    <Item {...args} />
  </BrowserRouter>
);

export const Defaults = Template.bind({});
Defaults.args = {
  productInfo: {
    image: MOCK_PRODUCT_LIST[0].image,
    name: MOCK_PRODUCT_LIST[0].name,
    price: MOCK_PRODUCT_LIST[0].price,
  },
};
