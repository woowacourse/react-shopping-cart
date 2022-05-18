import React from 'react';

import WhiteButton from 'components/WhiteButton';

export default {
  title: 'Component/WhiteButton',
  component: WhiteButton,
  argTypes: {
    fontSize: { controls: 'number' },
    fontWeight: { controls: 'number' },
    children: { controls: 'text' },
  },
};

const Template = (args) => <WhiteButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  fontSize: 15,
  fontWeight: 500,
  children: '안녕',
};
