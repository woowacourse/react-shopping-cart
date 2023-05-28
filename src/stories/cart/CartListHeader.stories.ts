import { Meta, StoryObj } from '@storybook/react';

import CartListHeader from '../../components/cart/CartListHeader/CartListHeader';

const meta = {
  title: 'ShoppingCart/Cart/CartListHeader',
  component: CartListHeader,
} satisfies Meta<typeof CartListHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
