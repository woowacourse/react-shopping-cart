import type { StoryFn } from '@storybook/react';

import CounterInput from './CounterInput';
import { useState } from 'react';

export default {
  title: 'CounterInput',
  component: CounterInput,
};

const Template: StoryFn<React.ComponentProps<typeof CounterInput>> = (props) => {
  return <CounterInput {...props} />;
};

export const Controls = Template.bind({});
Controls.args = {
  cartItemId: 1,
  min: 0,
  max: 10,
  style: {},
};
