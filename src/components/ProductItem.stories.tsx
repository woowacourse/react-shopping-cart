import type { Meta, StoryObj } from '@storybook/react';
import { styled } from 'styled-components';
import ProductItem from './ProductItem';

const Container = styled.div`
  width: 300px;
`;

const meta = {
  title: 'ProductItem',
  component: ProductItem,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof ProductItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    productId: 1,
  },
};
