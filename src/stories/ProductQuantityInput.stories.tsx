import type { Meta, StoryObj } from '@storybook/react';
import QuantityInputButton from '../components/QuantityInputButton/QuantityInputButton';

/**
 * 제품의 수량을 입력하는 ProductQuantityInput 컴포넌트입니다.
 */

const meta = {
  title: 'QuantityInputButton',
  component: QuantityInputButton,
} satisfies Meta<typeof QuantityInputButton>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: { productId: 8 },
};

export default meta;
