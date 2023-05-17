import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Header from '@/components/Header';

export default {
	component: Header,
	title: 'Header',
} as Meta;

const Template: StoryFn = () => <Header />;

export const CustomHeader = Template.bind({});
