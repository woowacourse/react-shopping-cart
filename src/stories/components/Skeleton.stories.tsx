import { Meta, StoryObj } from '@storybook/react';
import Skeleton from '../../components/main/Skeleton';

const meta = {
  title: 'Components/Common/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
