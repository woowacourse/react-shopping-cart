import type { Meta, StoryObj } from '@storybook/react';
import CartItem from '.';
import { RecoilRoot } from 'recoil';

const meta = {
  title: 'Example/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  args: {
    product: {
      id: 9,
      name: '밀크티',
      price: 9000,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/2806/9936/products/zws-essentials-sponge-cloth-set-of-4-zero-waste-sponge-cloth-swedish-dish-cloth-paper-towel-replacement-kitchen-sponge-31138620276847.jpg?v=1655836694&width=300',
    },
    id: 9,
    quantity: 2,
  },
  decorators: [
    (Story) => (
      <RecoilRoot>
        <div style={{ width: '1000px' }}>
          <Story />
        </div>
      </RecoilRoot>
    ),
  ],
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {};
