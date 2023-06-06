import type { Meta, StoryObj } from '@storybook/react';
import { customViewPorts } from '../../../../.storybook/preview';

import { Cart } from './Cart';

const meta = {
  title: 'ShoppingCart/ShoppingCart',
  component: Cart,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Cart>;

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
