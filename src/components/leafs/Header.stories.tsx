import type { StoryFn } from '@storybook/react';

import Header from './Header';

export default {
  title: 'Header',
  component: Header,
};

const Template: StoryFn<React.ComponentProps<typeof Header>> = () => <Header />;

export const DefaultHeader = Template.bind({});
DefaultHeader.args = {};
