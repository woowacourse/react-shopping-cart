import { Meta, StoryObj } from '@storybook/react';
import { ProductListPage } from '../pages/ProductListPage';

const meta = {
  component: ProductListPage,
  title: 'Pages/ProductList',
} satisfies Meta<typeof ProductListPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
