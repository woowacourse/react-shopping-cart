import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Button from '@/components/Button';
import type { ButtonProps } from '@/components/Button';

export default {
	component: Button,
	title: 'Check',
} as Meta<ButtonProps>;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const CustomButton = Template.bind({});

CustomButton.args = {
	width: '100px',
	height: '100px',
};
