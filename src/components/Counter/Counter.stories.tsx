import { Meta, StoryObj } from '@storybook/react';
import Counter from '.';

const counter = {
  component: Counter,
  title: 'Counter',
  tags: ['autodocs'],
} satisfies Meta<typeof Counter>;

export default counter;

type Story = StoryObj<typeof counter>;

export const Default: Story = {
  render: () => {
    return <Counter />;
  },
};
