import type { Meta, StoryObj } from '@storybook/react';
import { styled } from 'styled-components';
import ExampleProduct from '../assets/images/example-product.jpg';
import ProductListItem from './ProductListItem';

const Container = styled.div`
  width: 300px;
`;

const meta = {
  title: 'ProductItem',
  component: ProductListItem,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof ProductListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: {
      id: 1,
      name: '아이크',
      imageUrl: ExampleProduct,
      price: 1000,
    },
  },
};
