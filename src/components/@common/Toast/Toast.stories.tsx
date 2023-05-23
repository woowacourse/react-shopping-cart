import { Meta, StoryObj } from '@storybook/react';
import Toast from '.';

const toastMessage = {
  component: Toast,
  title: 'Common/Toast',
} satisfies Meta<typeof Toast>;

export default toastMessage;

type Story = StoryObj<typeof toastMessage>;

export const Error: Story = {
  args: {
    id: 0,
    message: '에러입니다 하하',
    type: 'error',
  },
};

export const Success: Story = {
  args: {
    id: 1,
    message: '성공입니다 하하',
    type: 'success',
  },
};
