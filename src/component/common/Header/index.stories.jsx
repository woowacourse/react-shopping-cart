import React from 'react';

import Header from 'component/common/Header';

export default {
  component: Header,
  title: 'Header',
};

const Template = (args) => <Header {...args} />;

export const Defaults = Template.bind({});
