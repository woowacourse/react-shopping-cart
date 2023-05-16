import type { Meta, StoryObj } from '@storybook/react';
import BucketCounter from '.';

const meta: Meta<typeof BucketCounter> = {
  title: 'BucketCounter',
  component: BucketCounter,
};

export default meta;
type Story = StoryObj<typeof BucketCounter>;

export const Default: Story = {
  args: {},
};
