import React from 'react';
import Header from '.';
import ShoppingCart from '../common/Icon/ShoppingCart';

export default {
  title: 'Header',
  component: Header,
  argTypes: {},
};

const Template = (args) => <Header {...args} />;

export const DefaultHeader = Template.bind({});
DefaultHeader.args = {
  logo: <ShoppingCart />,
  title: 'WOOWA SHOP',
};
