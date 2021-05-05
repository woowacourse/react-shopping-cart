import React from 'react';
import BaseLayout from './BaseLayout';

export default {
  title: 'layout/BaseLayout',
  component: BaseLayout,
};

const Template = (args) => <BaseLayout {...args} />;

export const Default = Template.bind({});
Default.args = {};
