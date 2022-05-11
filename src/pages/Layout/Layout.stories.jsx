import React from 'react';
import Layout from 'pages/Layout/index';

export default {
  title: 'pages/Layout',
  component: Layout,
};

const Template = (args) => <Layout {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '레이아웃 테스트',
};
