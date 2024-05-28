import type { Meta, StoryObj } from '@storybook/react';
import CartItem from './CartItem';
import { RecoilRoot } from 'recoil';
import { cartItemListState } from '../../recoil/cartItem/atom';

const MOCK_DATA = {
  id: 11,
  name: '리복',
  price: 23000,
  quantity: 4,
  imageUrl:
    'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
};
const meta = {
  title: 'Components/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: '',
      control: { type: 'radio' },
      options: ['cart', 'confirm'],
    },
    cartItem: {
      description: '',
      control: { type: 'object' },
    },
  },
  args: { type: 'cart', cartItem: MOCK_DATA },
} satisfies Meta<typeof CartItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ type, cartItem }) => {
    return (
      <RecoilRoot
        initializeState={({ set }) => set(cartItemListState, [MOCK_DATA])}
      >
        <div style={{ width: '430px' }}>
          <CartItem type={type} cartItem={cartItem} />
        </div>
      </RecoilRoot>
    );
  },
};
