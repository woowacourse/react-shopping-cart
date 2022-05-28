import React from 'react';
import CheckBox from 'components/common/Styled/CheckBox';

export default {
  title: 'components/common/CheckBox',
  component: CheckBox,
};

const Template = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: 'total',
};
