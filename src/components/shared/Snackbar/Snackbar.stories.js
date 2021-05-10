import React from 'react';
import Snackbar from './Snackbar';

export default {
  title: 'shared/Snackbar',
  component: Snackbar,
};

const Template = (args) => <Snackbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: '스낵바입니다',
  isShowing: true,
};
