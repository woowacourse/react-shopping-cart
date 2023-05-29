import { Meta, StoryObj } from '@storybook/react';
import { NotFound } from '../pages/NotFound';

const meta = {
  component: NotFound,
  title: 'Pages/NotFound',
} satisfies Meta<typeof NotFound>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
