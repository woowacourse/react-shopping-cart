import type { Meta, StoryObj } from '@storybook/react';
import Product from '../components/product/Product';
import { styled } from 'styled-components';

const meta = {
  title: 'ShoppingCart/product/Product',
  component: Product,
  tags: ['autodocs'],
} satisfies Meta<typeof Product>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    productInfo: {
      id: 1,
      name: '지구',
      price: 1000,
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/28/earth-11009__480.jpg',
    },
  },

  render: ({ ...args }) => {
    return (
      <Style.ProductWrapper>
        <Product {...args} />
      </Style.ProductWrapper>
    );
  },
};

const Style = {
  ProductWrapper: styled.div`
    width: 200px;
  `,
};
