import React from 'react';
import Title from 'components/common/Title';

export default {
  title: 'components/common/Title',
  component: Title,
};

const Template = (args) => <Title {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '장바구니',
};
