import type { Meta, StoryObj } from '@storybook/react';
import CartItem from './CartItem';

const meta = {
  title: 'box/CartItem',
  component: CartItem,
  tags: ['autodocs'],
} satisfies Meta<typeof CartItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CartItemContent: Story = {
  args: {
    cart: {
      id: 1,
      product: {
        id: 1,
        name: '[든든] 야채바삭 김말이 700g',
        price: 5100,
        imageUrl:
          'https://s3-alpha-sig.figma.com/img/aab2/fead/007ca08138a03e66f91636b93c0cdcfb?Expires=1685318400&Signature=i2kOl4ejCqu0nBuyyE5uYWJ7Thm69DGMPKgH3QnJbLzwvI3yee3jRORLwCTgwZWY3mqMfygpvpDMzL3lfNq3NR4uZcYDDNF8bf3RU4lwtEDpKX5H1gf67eaNr3oUBjEfgEfPv0hKx~A16JP55JWqipWNBn~rSOLjhYVdko6qMEotBpSkE9uMT5ueyr-eKPE3B5FZUEUb4fj8h3mLLkLHOBawLJVT9OxqDB9XLDLTI8q30QnIaJ7UkTTMW-5VRqIsz1jdyttvipwWYoZFVvHeI6hOdAgdsKBso2N~b5xKY34mrpxnnHf3dMMc~7foR4ucFdp5pIMaq5oc4cfuco7C0w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
      },
      quantity: 1,
    },
  },
};
