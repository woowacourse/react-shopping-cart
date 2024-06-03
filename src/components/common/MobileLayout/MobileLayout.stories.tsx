import type { StoryObj } from '@storybook/react';
import MobileLayout from './MobileLayout';

const meta = {
  title: 'Components/MobileLayout',
  component: MobileLayout,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: 'hi',
  },
  render: (args) => <MobileLayout {...args} />,
};
