import type { Meta, StoryObj } from '@storybook/react';
import CheckoutSummary from '../components/CartList/CheckoutSummary';
import { StoryContainer } from './styles';

const meta: Meta<typeof CheckoutSummary> = {
  title: 'ShoppingCart/CheckoutSummary',
  component: CheckoutSummary,
  parameters: {
    docs: {
      description: {
        component: '결제 요약 컴포넌트입니다.',
      },
    },
  },

  tags: ['autodocs'],

  argTypes: {
    totalPrice: {
      description: '상품의 총 금액입니다.',
    },
    shippingFee: {
      description: '배송비입니다.',
    },
  },

  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Summary: Story = {
  args: {
    totalPrice: 10000,
    shippingFee: 3000,
  },
};
