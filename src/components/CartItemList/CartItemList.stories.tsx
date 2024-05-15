import type { Meta, StoryObj } from '@storybook/react';
import CartItemList, { CartItemListProps } from './CartItemList';
import { RecoilRoot } from 'recoil';

const meta = {
  title: 'Components/CartItemList',
  component: CartItemList,
  tags: ['autodocs'],
  argTypes: {
    itemList: {
      description: '',
      control: { type: 'object' },
    }
  },
  args: {
    itemList: [
      {
        "id": 586,
        "quantity": 4,
        "product": {
          "id": 2,
          "name": "나이키",
          "price": 1000,
          "imageUrl": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
          "category": "fashion"
        }
      },
      {
        "id": 587,
        "quantity": 3,
        "product": {
          "id": 3,
          "name": "아디다스",
          "price": 2000,
          "imageUrl": "https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg",
          "category": "fashion"
        }
      },
      {
        "id": 588,
        "quantity": 1,
        "product": {
          "id": 10,
          "name": "퓨마",
          "price": 10000,
          "imageUrl": "https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg",
          "category": "fashion"
        }
      },
      {
        "id": 589,
        "quantity": 4,
        "product": {
          "id": 11,
          "name": "리복",
          "price": 20000,
          "imageUrl": "https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg",
          "category": "fashion"
        }
      },
      {
        "id": 590,
        "quantity": 5,
        "product": {
          "id": 12,
          "name": "컨버스",
          "price": 20000,
          "imageUrl": "https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg",
          "category": "fashion"
        }
      }
    ],
  }
} satisfies Meta<typeof CartItemList>;

export default meta;

type Story = StoryObj<typeof meta>;

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
};
