import React from 'react';
import BoxButton from './index.js';

export default {
  title: 'components/common/BoxButton',
  component: BoxButton,
};

const Template = args => <BoxButton {...args}>Text</BoxButton>;

export const BrownButton = Template.bind({});

BrownButton.args = {
  buttonStyle: 'brown-button',
};

export const MintButton = Template.bind({});

MintButton.args = {
  buttonStyle: 'mint-button',
};
