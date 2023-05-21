import { Meta, StoryObj } from '@storybook/react';

import { LoadingSpinner } from '../../../components/@common/LoadingSpinner';

const meta = {
  title: 'Components/Common/Spinner',
  component: LoadingSpinner,
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
