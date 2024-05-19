import type { Meta, StoryObj } from '@storybook/react';
import CartItem from '../components/CartItem';
import { StoryContainer } from './styles';

const meta: Meta<typeof CartItem> = {
  title: 'ShoppingCart/CartItem',
  component: CartItem,
  parameters: {
    docs: {
      description: {
        component: '하나의 장바구니 아이템을 보여주는 컴포넌트입니다.',
      },
    },
  },

  tags: ['autodocs'],

  argTypes: {
    cartItem: {
      control: false,
      description:
        '장바구니 아이템 정보가 객체로 전달됩니다. 장바구니 아이템의 아이디, 수량, 상품 정보가 담겨 있습니다.',
    },
  },

  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const SingleCartItem: Story = {
  args: {
    cartItem: {
      id: 300,
      quantity: 2,
      product: {
        id: 10,
        name: '퓨마',
        price: 100000,
        imageUrl:
          'https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg',
        category: 'fashion',
      },
    },
  },
};
