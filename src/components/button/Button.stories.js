import React from 'react';
import Button, { BUTTON_TYPE } from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: Object.values(BUTTON_TYPE),
      },
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: '버튼',
  type: BUTTON_TYPE.MEDIUM,
  onClick: () => {},
};
