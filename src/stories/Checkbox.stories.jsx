import React from 'react';

import Checkbox from 'components/Checkbox';

export default {
  title: 'Component/Checkbox',
  component: Checkbox,
  argTypes: {
    label: { controls: 'text' },
  },
};

const Template = (args) => <Checkbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: '라벨이다',
};
