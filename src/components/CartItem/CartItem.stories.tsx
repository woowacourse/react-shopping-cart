import type { Meta, StoryObj } from '@storybook/react';
import CartItem, { CartItemProps } from './CartItem';
import { RecoilRoot } from 'recoil';

const meta = {
  title: 'Components/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  argTypes: {
    product: {
      description: '',
      control: { type: 'object' },
    },
    quantity: {
      description: '',
      control: { type: 'number', min: 1 },
    },
    cartItemId: {
      description: '',
    },
  },
  args: {
    product: {
      productId: 3,
      name: '아디다스',
      price: 2000,
      imageUrl: 'https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg',
      category: 'fashion',
    },
    quantity: 1,
    cartItemId: 1,
  },
} satisfies Meta<typeof CartItem>;

export default meta;

type Story = StoryObj<typeof meta>;

// TODO : decorator 사용하여 동작할 수 있도록 current: recoil로 인해 작동 x
export const Playground: Story = {
  render: ({ ...args }: CartItemProps) => {
    return (
      <RecoilRoot>
        <div style={{ width: '430px' }}>
          <CartItem {...args} />
        </div>
      </RecoilRoot>
    );
  },
};
