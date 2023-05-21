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
  },

  argTypes: {
    productId: {
      control: {
        disable: true,
      },
      description: '상품의 고유한 `id`입니다<br>해당 `id`의 `QuantityButton`이 됩니다.',
    },
  },
};
