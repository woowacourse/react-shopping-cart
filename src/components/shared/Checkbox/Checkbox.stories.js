import React from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'shared/Checkbox',
  component: Checkbox,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  labelText: '선택 해제',
};
