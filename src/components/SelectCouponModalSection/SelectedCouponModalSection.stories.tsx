import type { Meta, StoryObj } from '@storybook/react';

import SelectCouponModalSection from './SelectCouponModalSection';

const meta = {
  title: 'Components/SelectCouponModalSection',
  component: SelectCouponModalSection,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectCouponModalSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
