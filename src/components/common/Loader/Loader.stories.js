import React from 'react';
import PALETTE from '../../../constants/palette';
import * as Styled from './style';

export default {
  title: 'Common/Loader',
  component: Loader,
  argTypes: {},
};

const Template = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {};
