import type { Meta, StoryObj } from '@storybook/react';
import Title from './Title';

const meta = {
  title: 'Components/Title',
  component: Title,
  tags: ['autodocs'],
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    title: '타이틀입니다.',
    description: '서브 타이틀입니다.',
  },
};
