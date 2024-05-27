import type { Meta, StoryObj } from '@storybook/react';
<<<<<<< HEAD
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
=======
import CartItemList, { CartItemListProps } from './CartItemList';
import { RecoilRoot } from 'recoil';
>>>>>>> todari

const meta = {
  title: 'Components/CartItemList',
  component: CartItemList,
  tags: ['autodocs'],
  argTypes: {
<<<<<<< HEAD
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
=======
    itemList: {
      description: '',
      control: { type: 'object' },
    }
  },
  args: {
    itemList: [
      {
        "cartItemId": 586,
        "quantity": 4,
        "product": {
          "productId": 2,
          "name": "나이키",
          "price": 1000,
          "imageUrl": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
          "category": "fashion"
        }
      },
      {
        "cartItemId": 587,
        "quantity": 3,
        "product": {
          "productId": 3,
          "name": "아디다스",
          "price": 2000,
          "imageUrl": "https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg",
          "category": "fashion"
        }
      },
      {
        "cartItemId": 588,
        "quantity": 1,
        "product": {
          "productId": 10,
          "name": "퓨마",
          "price": 10000,
          "imageUrl": "https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg",
          "category": "fashion"
        }
      },
      {
        "cartItemId": 589,
        "quantity": 4,
        "product": {
          "productId": 11,
          "name": "리복",
          "price": 20000,
          "imageUrl": "https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg",
          "category": "fashion"
        }
      },
      {
        "cartItemId": 590,
        "quantity": 5,
        "product": {
          "productId": 12,
          "name": "컨버스",
          "price": 20000,
          "imageUrl": "https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg",
          "category": "fashion"
        }
      }
    ],
  }
>>>>>>> todari
} satisfies Meta<typeof CartItemList>;

export default meta;

type Story = StoryObj<typeof meta>;

<<<<<<< HEAD
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
=======
// TODO : decorator 사용하여 동작할 수 있도록 current: recoil로 인해 작동 x
export const Playground: Story = {
  render: ({ ...args }: CartItemListProps) => {
    return (
      <RecoilRoot>
        <div style={{ width: '430px' }}>
          <CartItemList {...args} />
        </div>
      </RecoilRoot>
    )
  }
>>>>>>> todari
};
