import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Item from 'component/Item';
import {MOCK_PRODUCT_LIST} from 'mocks/mockData';

export default {
  component: Item,
  title: 'Item',
  argTypes: {
    handleImageClick: {action: 'click', table: {disable: true}},
    handleIconClick: {action: 'click', table: {disable: true}},
    id: {table: {disable: true}},
  },
};

const Template = (args) => (
  <BrowserRouter>
    <Item {...args} />
  </BrowserRouter>
);

export const Defaults = Template.bind({});
Defaults.args = {
  itemImgURL: MOCK_PRODUCT_LIST[0].image,
  itemName: MOCK_PRODUCT_LIST[0].name,
  itemPrice: MOCK_PRODUCT_LIST[0].price,
  isInCart: false,
};
