import type { Meta, StoryObj } from '@storybook/react';
import SelectAll from './SelectAll';

const meta = {
  title: 'SelectAll',
  component: SelectAll,
} satisfies Meta<typeof SelectAll>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 비활성화: Story = {
  args: {
    isSelectAll: false,
    onSelectAllClick: () => console.log('올리'),
  },
};

export const 활성화: Story = {
  args: {
    isSelectAll: true,
    onSelectAllClick: () => console.log('올리'),
  },
};
