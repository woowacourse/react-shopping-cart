import type { StoryFn } from '@storybook/react';

import CounterInput from './CounterInput';
import { useState } from 'react';

export default {
  title: 'CounterInput',
  component: CounterInput,
};

const Template: StoryFn<React.ComponentProps<typeof CounterInput>> = (props) => {
  const [count, setCount] = useState('0');
  return <CounterInput {...props} count={count} setCount={setCount} />;
};

export const Controls = Template.bind({});
Controls.args = {
  min: 0,
  max: 10,
  style: {},
};
