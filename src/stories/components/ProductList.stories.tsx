import type { Meta, StoryObj } from '@storybook/react';
import ProductList from '../../components/main/ProductList';
import { handlers } from '../../mocks/handlers';

const meta = {
  title: 'Pages/product/ProductList',
  component: ProductList,
  tags: ['autodocs'],
  parameters: {
    msw: handlers,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
