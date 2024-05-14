import type { Meta, StoryObj } from '@storybook/react';
import ProductItem from './ProductItem';

const meta = {
  title: 'ProductItem',
  component: ProductItem,
} satisfies Meta<typeof ProductItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
