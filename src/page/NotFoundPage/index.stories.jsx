import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import NotFoundPage from 'page/NotFoundPage';

export default {
  component: NotFoundPage,
  title: 'Pages/NotFoundPage',
  argTypes: {},
};

const Template = (args) => (
  <BrowserRouter>
    <NotFoundPage {...args} />
  </BrowserRouter>
);

export const Defaults = Template.bind({});
Defaults.args = {
  children: '잘못된 페이지로 들어왔어요',
};
