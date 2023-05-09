import { Meta, StoryObj } from '@storybook/react';

import AmountCounter from '../components/Common/AmountCounter';

const meta = {
  title: 'Common/AmountCounter',
  component: AmountCounter,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof AmountCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 0,
  },
};
