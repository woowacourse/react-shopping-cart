import React from 'react';
import { Story, Meta } from '@storybook/react';

import SnackBar, { SnackBarProps } from '.';

export default {
  title: 'SnackBar',
  component: SnackBar,
} as Meta;

const Template: Story<SnackBarProps> = (args) => <SnackBar {...args} />;

export const Default = Template.bind({});

Default.args = {
  messages: ['스낵바입니다1', '스낵바입니다2'],
};
