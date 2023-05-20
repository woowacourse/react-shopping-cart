import type { Meta, StoryObj } from '@storybook/react';
import Price from '../../components/common/Price';

const meta = {
  title: 'ShoppingCart/common/Price',
  component: Price,
  tags: ['autodocs'],
} satisfies Meta<typeof Price>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    price: 9900,
    size: 'small',
    color: '#295bb7',
  },
};

export const Medium: Story = {
  args: {
    price: 99900,
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    price: 123456,
    size: 'large',
  },
};

export const TotalPrice: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '250px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    price: 300000,
    size: 'large',
    tag: '총 상품가격',
  },
};
