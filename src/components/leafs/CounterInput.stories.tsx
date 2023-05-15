import type { StoryFn } from '@storybook/react';

import CounterInput from './CounterInput';
import { useState } from 'react';

export default {
  title: 'CounterInput',
  component: CounterInput,
};

const Template: StoryFn<React.ComponentProps<typeof CounterInput>> = () => {
  const [value, setValue] = useState('0');
  return <CounterInput value={value} setValue={setValue} />;
};
export const Controls = Template.bind({});
Controls.args = {};
