import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import CartProductItem from '../components/Product/CartProductItem';

const meta = {
  title: 'Product/CartProductItem',
  component: CartProductItem,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
} satisfies Meta<typeof CartProductItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCartProduct = {
  id: 1,
  quantity: 1,
  product: {
    id: 1,
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
    imageUrl: 'images/정사각-420.jpeg',
  },
};

export const Default: Story = {
  args: { cartProduct: mockCartProduct },
};
