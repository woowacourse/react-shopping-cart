import { Meta, StoryObj } from '@storybook/react';
import LoadingSkeleton from '.';

const loadingSkeleton = {
  component: LoadingSkeleton,
  title: 'Product/LoadingSkeleton',
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingSkeleton>;

export default loadingSkeleton;

type Story = StoryObj<typeof loadingSkeleton>;

export const ProductItemSkeleton: Story = {
  render: () => {
    return <LoadingSkeleton />;
  },
};
