import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Stepper from './Stepper';

const meta = {
  title: 'Stepper',
  component: Stepper,
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {
  decorators: [
    Story => {
      const [quantity, setQuantity] = useState<number>(0);
      const handleIncrement = async () => {
        setQuantity(prev => prev + 1);
      };
      const handleDecrement = async () => {
        setQuantity(prev => Math.max(prev - 1, 0));
      };
      return (
        <Story
          args={{
            value: quantity,
            handleIncrement: handleIncrement,
            handleDecrement: handleDecrement,
          }}
        />
      );
    },
  ],
  args: {
    value: 0,
    handleIncrement: async () => console.log('올리'),
    handleDecrement: async () => console.log('쿠키'),
  },
};
