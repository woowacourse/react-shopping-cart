import React from 'react';
import CheckBox from './index.js';

export default {
  title: 'components/common/CheckBox',
  component: CheckBox,
};

export const Primary = args => <CheckBox {...args}>Text</CheckBox>;

Primary.args = {
  checked: false,
  onClick: () => {},
};
