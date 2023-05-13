import { Meta, StoryObj } from '@storybook/react';

import LoadingPage from './LoadingPage';

const meta: Meta<typeof LoadingPage> = {
  title: 'LoadingPage',
  component: LoadingPage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LoadingPage>;

export const Default: Story = {};
