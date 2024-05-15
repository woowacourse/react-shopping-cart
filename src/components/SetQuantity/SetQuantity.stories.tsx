import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SetQuantity from './SetQuantity';

const meta = {
  title: 'SetQuantity',
  component: SetQuantity,
} satisfies Meta<typeof SetQuantity>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본_SetQuantity: Story = {
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
            quantity: quantity,
            handleIncrement: handleIncrement,
            handleDecrement: handleDecrement,
          }}
        />
      );
    },
  ],
  args: {
    quantity: 0,
    handleIncrement: async () => console.log('올리'),
    handleDecrement: async () => console.log('쿠키'),
  },
};
