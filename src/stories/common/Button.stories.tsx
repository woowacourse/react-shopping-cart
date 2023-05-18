import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../components/common/Button';

const meta = {
  title: 'ShoppingCart/common/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    designType: 'text',
    fontSize: '20px',
    children: 'Button',
  },
};

export const Square: Story = {
  args: {
    designType: 'square',
    bgColor: 'skyblue',
    color: 'white',
    children: '🐾',
  },
};

export const Rectangle: Story = {
  args: {
    designType: 'rectangle',
    bgColor: 'skyblue',
    color: 'white',
    children: 'Button',
  },
};
