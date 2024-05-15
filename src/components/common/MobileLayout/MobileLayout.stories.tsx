import type { Meta, StoryObj } from '@storybook/react';
import MobileLayout from './MobileLayout';

const meta = {
  title: 'Components/MobileLayout',
  component: MobileLayout,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MobileLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
