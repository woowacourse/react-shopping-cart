import type { Meta, StoryObj } from '@storybook/react';
import ErrorPage from './ErrorPage';

const meta = {
  title: 'pages/ErrorPage',
  component: ErrorPage,
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: new Error('에러가 발생했습니다.'),
  },
};
