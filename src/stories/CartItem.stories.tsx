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
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
