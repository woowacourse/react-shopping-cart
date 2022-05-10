import React from 'react';
import Header from './Header';

export default {
  component: Header,
  title: 'Header',
};

const Template = args => {
  return <Header {...args} />;
};

export const DefaultHeader = Template.bind({});

DefaultHeader.args = {};
