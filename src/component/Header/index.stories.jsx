import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Header from 'component/Header';

export default {
  component: Header,
  title: 'Header',
};

const Template = (args) => (
  <BrowserRouter>
    <Header {...args} />
  </BrowserRouter>
);

export const Defaults = Template.bind({});
