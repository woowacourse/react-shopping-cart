import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import Header from '.';
import ShoppingCart from '../common/Icon/ShoppingCart';
import Navigation from '../Navigation';

import { HEADER } from '../../constants/appInfo';

export default {
  title: 'Header',
  component: Header,
  argTypes: {},
};

const Template = (args) => (
  <Router>
    <Header {...args} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  logo: <ShoppingCart />,
  title: HEADER.APP_TITLE,
};

export const WithNavigation = Template.bind({});
WithNavigation.args = {
  logo: <ShoppingCart />,
  title: HEADER.APP_TITLE,
  children: <Navigation navList={HEADER.NAV_LIST} />,
};
