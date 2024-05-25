import type { Meta, StoryObj } from '@storybook/react';
import CartItemList from './CartItemList';
import { RecoilRoot } from 'recoil';
import { cartItemListState } from '../../recoil/cartItem/atom';

const MOCK_DATA = [
  {
    id: 586,
    quantity: 4,
    name: '나이키',
    price: 1000,
    imageUrl:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
  },
  {
    id: 587,
    quantity: 3,

    name: '아디다스',
    price: 2000,
    imageUrl: 'https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg',
  },
  {
    id: 588,
    quantity: 1,
    name: '퓨마',
    price: 10000,
    imageUrl: 'https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg',
  },
  {
    id: 589,
    quantity: 4,

    name: '리복',
    price: 20000,
    imageUrl:
      'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
  },
  {
    id: 590,
    quantity: 5,

    name: '컨버스',
    price: 20000,
    imageUrl: 'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
  },
];

const meta = {
  title: 'Components/CartItemList',
  component: CartItemList,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: '',
      control: { type: 'radio' },
      options: ['cart', 'confirm'],
    },
    cartItemList: {
      description: '',
      control: { type: 'object' },
    },
  },
  args: {
    type: 'cart',
    cartItemList: MOCK_DATA,
  },
} satisfies Meta<typeof CartItemList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ type, cartItemList }) => {
    return (
      <RecoilRoot
        initializeState={({ set }) => set(cartItemListState, MOCK_DATA)}
      >
        <div style={{ width: '430px' }}>
          <CartItemList type={type} cartItemList={cartItemList} />
        </div>
      </RecoilRoot>
    );
  },
};
