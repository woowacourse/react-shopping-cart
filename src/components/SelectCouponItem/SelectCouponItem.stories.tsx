import type { Meta, StoryObj } from '@storybook/react';

import SelectCouponItem from './SelectCouponItem';

const meta = {
  title: 'Components/SelectCouponItem',
  component: SelectCouponItem,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectCouponItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
