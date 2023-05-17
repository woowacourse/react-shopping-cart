import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../components/common/Button';

const meta = {
  title: 'ShoppingCart/common/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Square: Story = {
  args: {
    designType: 'square',
  },
};

export const Rectangle: Story = {
  args: {
    bgColor: 'primary',
    designType: 'rectangle',
  },
};
