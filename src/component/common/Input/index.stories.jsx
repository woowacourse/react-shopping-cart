import React from 'react';

import Input from 'component/common/Input';

export default {
  component: Input,
  title: 'Input',
};

const Template = (args) => <Input {...args} />;
export const Defaults = Template.bind({});
Defaults.args = {
  type: 'number',
};
