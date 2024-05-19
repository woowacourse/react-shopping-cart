import type { Meta, StoryObj } from '@storybook/react';
import Fallback from './Fallback';

const meta = {
  title: 'Fallback',
  component: Fallback,
} satisfies Meta<typeof Fallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {};
