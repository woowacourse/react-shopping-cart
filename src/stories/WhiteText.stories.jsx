import React from 'react';

import WhiteText from 'components/WhiteText';

export default {
  title: 'Component/WhiteText',
  component: WhiteText,
  argTypes: {
    fontSize: { controls: 'number' },
    fontWeight: { controls: 'number' },
    children: { controls: 'text' },
  },
};

const Template = (args) => <WhiteText {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  fontSize: 15,
  fontWeight: 500,
  children: '안녕',
};
