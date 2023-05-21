import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CartQuantityStepper from 'components/CartQuantityStepper/CartQuantityStepper';

const meta = {
  component: CartQuantityStepper,
  title: 'CartQuantityStepper',
  decorators: [
    (Story) => (
      <div style={{ width: '50px', height: '50px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    decreaseQuantity: {
      description: '- 버튼을 눌렀을 때 실행 될 함수입니다.',
    },
    increaseQuantity: {
      description: '+ 버튼을 눌렀을 때 실행 될 함수입니다.',
    },
    initialIncrement: {
      description: '장바구니 icon을 눌렀을 때 실행 될 함수입니다.',
    },
    quantity: {
      description: '장바구니에 담긴 상품의 수량입니다.',
    },
  },
} satisfies Meta<typeof CartQuantityStepper>;

export default meta;

type Story = StoryObj<typeof CartQuantityStepper>;

const CartQuantityStepperWithHooks = () => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  return (
    <CartQuantityStepper
      quantity={quantity}
      initialIncrement={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
    ></CartQuantityStepper>
  );
};

export const Default: Story = {
  render: () => <CartQuantityStepperWithHooks />,
};
