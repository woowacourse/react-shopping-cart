import React from 'react';
import PageHeader from './PageHeader';

export default {
  title: 'shared/PageHeader',
  component: PageHeader,
};

const Template = (args) => <PageHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '장바구니',
};
