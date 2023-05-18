import type { Meta, StoryObj } from '@storybook/react';
import HomePage from '.';

const meta: Meta<typeof HomePage> = {
  title: 'page',
  component: HomePage,
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Home: Story = {
  args: {},
};
