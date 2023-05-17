import type { Meta, StoryObj } from '@storybook/react';
import ProductList from '.';

const meta: Meta<typeof ProductList> = {
  title: 'ProductList',
  component: ProductList,
};

export default meta;
type Story = StoryObj<typeof ProductList>;

export const Default: Story = {
  args: {},
};
