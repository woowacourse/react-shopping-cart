import type { Meta, StoryObj } from '@storybook/react';
import CartItem from '../../components/cart/CartItem';
import { styled } from 'styled-components';

const meta = {
  title: 'ShoppingCart/cart/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Style.ProductContainer>
        <Story />
      </Style.ProductContainer>
    ),
  ],
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cartItemInfo: {
      id: 1,
      quantity: 1,
      product: {
        id: 1,
        name: '지구',
        price: 1000,
        imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/28/earth-11009__480.jpg',
      },
    },
  },
};

const Style = {
  ProductContainer: styled.li`
    display: flex;
    justify-content: center;

    width: 550px;
    height: 200px;

    padding: 20px;
    border-bottom: 1px ridge;

    pointer-events: none;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      width: 708px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 315px;
    }
  `,
};
