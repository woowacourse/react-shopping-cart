import React from 'react';

import PageTitle from '.';

export default {
  title: 'Shared/PageTitle',
  component: PageTitle,
  argTypes: {},
};

const Template = (args) => <PageTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '장바구니',
};
