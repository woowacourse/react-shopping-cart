import type { StoryFn } from '@storybook/react';
import Counter from '../Counter';

export default {
  title: 'Counter',
  component: Counter,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

const Template: StoryFn<React.ComponentProps<typeof Counter>> = (props) => <Counter {...props} />;

export const DefaultCounter = Template.bind({});
DefaultCounter.args = {
  type: 'number',
};

export const LargeCounter = Template.bind({});
LargeCounter.args = {
  type: 'number',
  counterSize: 'large',
};
