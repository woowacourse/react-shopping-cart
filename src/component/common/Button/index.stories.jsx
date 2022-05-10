import React from 'react';

import Button from 'component/common/Button';

export default {
  component: Button,
  title: 'Button',
};

const Template = (args) => <Button {...args} />;

export const Defaults = Template.bind({});
Defaults.args = {
  children: '기본 버튼',
};
