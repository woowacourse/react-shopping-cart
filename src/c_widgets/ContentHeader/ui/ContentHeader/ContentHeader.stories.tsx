import { ContentHeader } from './ContentHeader';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ContentHeader> = {
  title: 'widgets/ContentHeader',
  component: ContentHeader,
};

export default meta;

type Story = StoryObj<typeof ContentHeader>;

export const Common: Story = {
  args: {
    title: 'This is a title',
    desc: 'This is a description',
  },
};
