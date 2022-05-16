import React from 'react';

import Button from 'components/Button';

export default {
  title: 'Component/Button',
  component: Button,
  argTypes: {
    fontSize: { controls: 'number' },
    fontWeight: { controls: 'number' },
    children: { controls: 'text' },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  fontSize: 15,
  fontWeight: 500,
  children: '안녕',
};
