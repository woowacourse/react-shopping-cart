import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Counter from '.';
import { CountMethod } from 'src/hooks/useCartUpdate';

const counter = {
  component: Counter,
  title: 'Common/Counter',
  tags: ['autodocs'],
  args: {
    count: 0,
  },
} satisfies Meta<typeof Counter>;

export default counter;

type Story = StoryObj<typeof counter>;

export const Default: Story = {
  render: () => {
    const [count, setCount] = useState(0);

    const productCountMethod = (event: React.MouseEvent, type: CountMethod) => {
      switch (type) {
        case 'increase':
          setCount((prev) => prev + 1);
          break;
        case 'decrease':
          setCount((prev) => prev - 1);
          break;
        default:
          return;
      }
    };

    return <Counter productCountMethod={productCountMethod} count={count} />;
  },
};
