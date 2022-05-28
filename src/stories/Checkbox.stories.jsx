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

export const AllCheck = Template.bind({});
AllCheck.args = {
  label: '선택해제',
};
