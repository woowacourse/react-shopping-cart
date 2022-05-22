import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import ProductCartPage from 'page/ProductCartPage';
import {handlers} from 'mocks/handlers';

export default {
  component: ProductCartPage,
  title: 'Pages/ProductCartPage',
  argTypes: {
    itemImgURL: {table: {disable: true}},
    itemName: {table: {disable: true}},
    itemPrice: {table: {disable: true}},
  },
};

const Template = (args) => (
  <BrowserRouter>
    <ProductCartPage {...args} />
  </BrowserRouter>
);

export const Defaults = Template.bind({});
Defaults.args = {};
Defaults.parameters = {
  msw: {
    handlers,
  },
};
