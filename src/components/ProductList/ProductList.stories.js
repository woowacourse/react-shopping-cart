import React from 'react';
import ProductList from '.';
import { HEADER } from '../../constants/appInfo';
import { reactFamily } from '../../mockData';
import ShoppingCart from '../common/Icon/ShoppingCart';
import Header from '../Header';
import Navigation from '../Navigation';

export default {
  title: 'ProductList',
  component: ProductList,
  argTypes: {},
};

const Template = (args) => <ProductList {...args} />;

export const Default = Template.bind({});
Default.args = {
  products: reactFamily,
};

export const Page = (args) => (
  <>
    <Header logo={<ShoppingCart />} title={HEADER.APP_TITLE}>
      <Navigation navList={HEADER.NAV_LIST} />
    </Header>
    <ProductList {...args} />
  </>
);

Page.args = {
  products: reactFamily,
};
