import { Meta, StoryObj } from '@storybook/react';
import { ProductList } from '../pages/ProductList';

const meta = {
  component: ProductList,
  title: 'Pages/ProductList',
} satisfies Meta<typeof ProductList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
