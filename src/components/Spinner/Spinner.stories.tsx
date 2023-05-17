import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Spinner from '@/components/Spinner';

export default {
	component: Spinner,
	title: 'Spinner',
} as Meta;

const Template: StoryFn = () => <Spinner />;

export const Default = Template.bind({});
