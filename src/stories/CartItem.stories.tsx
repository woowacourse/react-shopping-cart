import type { Meta, StoryObj } from '@storybook/react';
import { CartItem } from '../components/CartItem';
import GlobalStyle from '../GlobalStyle';

const meta = {
  title: 'ShoppingCart/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div>
        <GlobalStyle />
        <Story />
      </div>
    ),
  ],
  args: {
    quantity: 3,
    product: {
      id: 2,
      price: 20000,
      name: '피자',
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
    },
  },
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
