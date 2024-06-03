import { type Meta, type StoryObj } from '@storybook/react';
import Text from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: '',
      control: { type: 'radio' },
      options: ['s', 'm', 'l', 'custom'],
    },
    weight: {
      description: '',
      control: { type: 'radio' },
      options: ['s', 'm', 'l', 'custom'],
    },
    children: {
      description: '',
      control: { type: 'text' },
    },
  },
  args: {
    size: 'm',
    weight: 'm',
    children: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return <Text {...args}>{args.children}</Text>;
  },
};
