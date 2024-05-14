import type { Meta, StoryObj } from '@storybook/react';
import DeleteButton from './DeleteButton';

const meta = {
  title: 'DeleteButton',
  component: DeleteButton,
} satisfies Meta<typeof DeleteButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본_삭제버튼: Story = {
  args: {},
};
