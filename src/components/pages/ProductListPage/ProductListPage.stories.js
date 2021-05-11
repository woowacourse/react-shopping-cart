import React from 'react';
import ProductListPage from '.';
import { HEADER } from '../../../constants/appInfo';
import { mockData } from '../../../mockData';
import ShoppingCart from '../../common/Icon/ShoppingCart';
import Header from '../../Header';
import Navigation from '../../Navigation';
import Main from '../../Main';

export default {
  title: 'pages/ProductListPage',
  component: ProductListPage,
  argTypes: {},
};

const Template = (args) => <ProductListPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  products: mockData,
};

export const Page = (args) => (
  <>
    <Header logo={<ShoppingCart />} title={HEADER.APP_TITLE}>
      <Navigation navList={HEADER.NAV_LIST} />
    </Header>
    <Main>
      <ProductListPage {...args} />
    </Main>
  </>
);

Page.args = {
  products: mockData,
};
