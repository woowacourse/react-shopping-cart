import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import AmountCounter from '../components/Common/AmountCounter';

type AmountCounterSizeType = 'small' | 'medium';

interface AmountCounterProps {
  variant: AmountCounterSizeType;
  count: number;
  addCount: () => void;
  subtractCount: () => void;
}

const meta: Meta = {
  title: 'Common/AmountCounter',
  component: AmountCounter,
  tags: ['autodocs'],
  args: {
    variant: 'small',
    count: 1,
    addCount: () => {},
    subtractCount: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = (args: AmountCounterProps) => {
  const [count, setCount] = useState(1);

  const addCount = () => {
    setCount((prev) => prev + 1);
  };

  const subtractCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <AmountCounter
      {...args}
      count={count}
      addCount={addCount}
      subtractCount={subtractCount}
    />
  );
};

Default.args = {};
