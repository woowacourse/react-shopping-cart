import type { Meta, StoryObj } from '@storybook/react';
import FloatingButton from './FloatingButton';

const meta = {
  title: 'FloatingButton',
  component: FloatingButton,
} satisfies Meta<typeof FloatingButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '버튼 텍스트를 넣어주세요',
  },
};

export const Disabled: Story = {
  args: {
    text: '버튼 텍스트를 넣어주세요',
    isDisable: true,
  },
};
