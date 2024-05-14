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
      const up = () => {
        setQuantity(prev => prev + 1);
      };
      const down = () => {
        setQuantity(prev => Math.max(prev - 1, 0));
      };
      return <Story args={{ quantity: quantity, onClick: { plus: up, minus: down } }} />;
    },
  ],
  args: {
    quantity: 0,
    onClick: {
      plus: () => console.log('올리'),
      minus: () => console.log('쿠키'),
    },
  },
};
