import type { Meta, StoryObj } from '@storybook/react';
import ErrorBox from './ErrorBox';

const meta = {
  title: 'common/ErrorBox',
  component: ErrorBox,
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NetworkError: Story = {
  args: {
    errorType: 'network',
  },
};

export const EmptyList: Story = {
  args: {
    errorType: 'emptyList',
  },
};
