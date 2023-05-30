import { Meta, StoryObj } from '@storybook/react';
import { CartList } from '../pages/CartList';

const meta = {
  component: CartList,
  title: 'Pages/CartList',
} satisfies Meta<typeof CartList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
