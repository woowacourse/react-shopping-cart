import type { Meta, StoryObj } from '@storybook/react';

import PopUp from '../components/utils/PopUp/PopUp';

const meta = {
  title: 'ShoppingCart/PopUp',
  component: PopUp,
} satisfies Meta<typeof PopUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    text: ['아이템이 삭제되었습니다.'],
    isSuccess: true,
  },
};

export const Failure: Story = {
  args: {
    text: ['아이템이 삭제에 실패했습니다..'],
    isSuccess: false,
  },
};
