import React from 'react';
import Button from 'components/common/Button/index';

export default {
  title: 'components/common/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'button',
};
