import { Meta, StoryObj } from '@storybook/react';

import CartPage from '../../pages/CartPage';

const meta = {
  title: 'Pages/CartPage',
  component: CartPage,
  tags: ['autodocs'],
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
} satisfies Meta<typeof CartPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
