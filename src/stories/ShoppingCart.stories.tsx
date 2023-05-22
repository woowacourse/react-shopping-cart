import type { Meta, StoryObj } from '@storybook/react';
import { customViewPorts } from '../../.storybook/preview';

import { ShoppingCart } from '../components/pages/ShoppingCart';

const meta = {
  title: 'ShoppingCart/ShoppingCart',
  component: ShoppingCart,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ShoppingCart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      Default: customViewPorts.Mobile,
      defaultViewport: 'Mobile',
    },
  },
};
