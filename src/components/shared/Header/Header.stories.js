import React from 'react';
import Header from './Header';

export default {
  title: 'shared/Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};
