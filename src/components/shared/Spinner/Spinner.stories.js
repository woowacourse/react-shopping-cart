import React from 'react';
import Spinner from './Spinner';

export default {
  title: 'shared/Spinner',
  component: Spinner,
};

const Template = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {};
