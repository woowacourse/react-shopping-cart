import type { Meta, StoryObj } from '@storybook/react';
import CartList from '../../components/cart/CartList';
import { handlers } from '../../mocks/handlers';

const meta = {
  title: 'ShoppingCart/cart/CartList',
  component: CartList,
  parameters:{
    msw: handlers
  },
  tags: ['autodocs'],
  decorators:[

  ]
} satisfies Meta<typeof CartList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};