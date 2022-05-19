import React from 'react';
import Layout from 'components/@common/Layout/index';

export default {
  title: 'components/Layout',
  component: Layout,
};

const Template = (args) => <Layout {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '레이아웃 테스트',
};
