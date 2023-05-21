import { Meta, StoryObj } from '@storybook/react';
import QuantityButtonComponent from '../../components/cart/QuantityButton';

const meta = {
  component: QuantityButtonComponent,
  title: 'Components/Cart/QuantityButton',
} satisfies Meta<typeof QuantityButtonComponent>;

export default meta;

type Story = StoryObj<typeof QuantityButtonComponent>;

export const QuantityButton: Story = {
  args: {
    productId: 1,
    quantity: 1,
  },

  argTypes: {
    productId: {
      control: {
        disable: true,
      },
      description: '상품의 고유한 `id`입니다<br>해당 `id`의 `QuantityButton`이 됩니다.',
    },

    quantity: {
      control: {
        type: 'number',
        min: 1,
      },
      description: '상품의 수량을 바꿀 수 있습니다.<br> 수량을 변경하면 상품의 가격도 변경됩니다.',
    },
  },
};
