import { Meta, StoryObj } from '@storybook/react';

import CheckBox from '../components/Common/CheckBox';

const meta = {
  title: 'Common/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { id: '1' },
};
