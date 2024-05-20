import type { Meta, StoryObj } from '@storybook/react';
import PriceInfo from './PriceInfo';

const meta = {
  title: 'PriceInfo',
  component: PriceInfo,
} satisfies Meta<typeof PriceInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {
  args: {
    title: '안녕',
    price: 413000,
  },
};
