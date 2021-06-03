import React from 'react';
import Button from './index.js';

export default {
  title: 'components/@common/Button',
  component: Button,
};

const Template = args => <Button {...args}>Text</Button>;

export const BrownButton = Template.bind({});

BrownButton.args = {
  buttonStyle: 'brown-button',
};

export const MintButton = Template.bind({});

MintButton.args = {
  buttonStyle: 'mint-button',
};
