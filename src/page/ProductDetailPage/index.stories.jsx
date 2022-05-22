import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {rest} from 'msw';
import ProductDetailPage from 'page/ProductDetailPage';
import {MOCK_PRODUCT_LIST} from 'mocks/mockData';

export default {
  component: ProductDetailPage,
  title: 'Pages/ProductDetailPage',
  argTypes: {
    itemImgURL: {table: {disable: true}},
    itemName: {table: {disable: true}},
    itemPrice: {table: {disable: true}},
  },
};

const Template = (args) => (
  <BrowserRouter>
    <ProductDetailPage {...args} />
  </BrowserRouter>
);

export const Defaults = Template.bind({});
Defaults.args = {};

Defaults.parameters = {
  msw: {
    handlers: [
      rest.get(`${process.env.REACT_APP_PRODUCT_API_URL}/:id`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(MOCK_PRODUCT_LIST[0]));
      }),
    ],
  },
};
