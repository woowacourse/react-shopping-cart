import { useEffect, useState } from 'react';

import { GlobalStyle } from '../GlobalStyle';
import { Counter } from '../components/common/counter/Counter';
import { Meta } from '@storybook/react';

const meta = {
  title: 'Counter',
  component: Counter,
  decorators: [
    (Story) => (
      <>
        <GlobalStyle />
        <Story />
      </>
    ),
  ],
} as Meta;

export default meta;

export const CounterComponent = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (count <= 0) setCount(1);
  }, [count]);

  return <Counter quantity={count} handleQuantityChange={setCount} />;
};
