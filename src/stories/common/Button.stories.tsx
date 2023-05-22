import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/common/Button';

const meta = {
  title: 'ShoppingCart/common/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Square: Story = {
  args: {
    designType: 'square',
    style: { width: '30px', height: '30px', backgroundColor: 'grey' },
  },
};

export const Rectangle: Story = {
  args: {
    bgColor: 'primary',
    designType: 'rectangle',
  },
};
