import type { Meta, StoryObj } from '@storybook/react';
import ProductImage from './ProductImage';

const meta = {
  title: 'ProductImage',
  component: ProductImage,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://cdn-mart.baemin.com/sellergoods/main/c6f2f083-a8b8-4799-834b-444b5eaeb532.png?h=400&w=400',
  },
};
