import React from 'react';
import MainContainer from '.';

export default {
  title: 'components/shared/MainContainer',
  component: MainContainer,
};

const Template = args => <MainContainer {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: <>{'hello'}</>,
};
