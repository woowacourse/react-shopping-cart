import { ProductCard } from './ProductCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProductCard> = {
  title: 'entities/product/ProductCard',
  component: ProductCard,
  decorators: [
    (Story) => {
      return (
        <div style={{ width: '90vw', padding: '10px', border: '1px dashed black' }}>
          <Story />
        </div>
      );
    },
  ],
  args: {
    product: {
      id: 1,
      name: '상품명',
      price: 1000,
      imageUrl: 'https://picsum.photos/200',
      category: '카테고리',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

const style = { padding: '3px', border: '1px dashed black' };

export const Common: Story = {};

export const AllSlotFilled: Story = {
  args: {
    leftActionSlot: <div style={style}>LeftSlot</div>,
    rightActionSlot: <div style={style}>RightSlot</div>,
    counterSlot: <div style={style}>BottomSlot</div>,
  },
};
