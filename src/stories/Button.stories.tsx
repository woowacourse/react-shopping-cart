import React from 'react';
import Button from 'components/common/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: Button,
  title: 'Button',
} as ComponentMeta<typeof Button>;

const Template = args => <Button {...args} />;

export const Large: ComponentStory<typeof Button> = Template.bind({});
Large.args = {
  size: 'large',
  backgroundColor: 'brown',
};

export const Medium: ComponentStory<typeof Button> = Template.bind({});
Medium.args = {
  size: 'medium',
  backgroundColor: 'primary',
};

export const Small: ComponentStory<typeof Button> = Template.bind({});
Small.args = {
  size: 'small',
  backgroundColor: 'primary',
};
