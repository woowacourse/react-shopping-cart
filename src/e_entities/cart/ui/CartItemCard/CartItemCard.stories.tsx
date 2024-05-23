import { mockProducts } from '../../../../../mocks/index';

import { CartItemCard } from './CartItemCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CartItemCard> = {
  title: 'entities/product/CartItemCard',
  component: CartItemCard,
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
    product: mockProducts[0],
  },
};

export default meta;

type Story = StoryObj<typeof CartItemCard>;

const style = { padding: '3px', border: '1px dashed black' };

export const Common: Story = {};

export const AllSlotFilled: Story = {
  args: {
    leftActionSlot: <div style={style}>LeftSlot</div>,
    rightActionSlot: <div style={style}>RightSlot</div>,
    counterSlot: <div style={style}>BottomSlot</div>,
  },
};
