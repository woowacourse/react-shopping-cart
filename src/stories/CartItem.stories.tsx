import { RecoilRoot } from 'recoil';
import { Meta, StoryObj } from '@storybook/react';
import mockData from '../assets/mockData.json';
import { GlobalStyle } from '../GlobalStyle';
import { CartItem } from '../components/cartPage/cartItemsSection/CartItem';

const meta = {
  title: 'CartItem',
  component: CartItem,
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <GlobalStyle />
          <Story />
        </RecoilRoot>
      );
    },
  ],
  argTypes: {
    name: {
      control: { type: 'text' },
    },
    imageUrl: {
      options: mockData.reduce(
        (acc, curr) => ({ ...acc, [curr.name]: curr.imageUrl }),
        {}
      ),
      control: {
        type: 'select',
      },
    },
  },
} satisfies Meta<typeof CartItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CartItemComponent: Story = {
  args: {
    id: 1,
    name: '상품명',
    price: 30000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/212310b6-6560-4895-8171-afce97bc526d.png',
  },
};
