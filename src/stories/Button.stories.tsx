import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from 'components/common/Button';
import React from 'react';

export default {
  component: Button,
  title: 'Button',
} as ComponentMeta<typeof Button>;

const Template = args => <Button {...args} />;

export const Large: ComponentStory<typeof Button> = Template.bind({});
Large.args = {
  backgroundColor: 'brown',
};

export const Medium: ComponentStory<typeof Button> = Template.bind({});
Medium.args = {
  backgroundColor: 'primary',
};

export const Small: ComponentStory<typeof Button> = Template.bind({});
Small.args = {
  backgroundColor: 'primary',
};
