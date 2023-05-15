import { Meta, StoryObj } from '@storybook/react';

import Spinner from '../../components/common/Spinner/Spinner';

const meta = {
  title: 'ShoppingCart/Common/Spinner',
  component: Spinner,
  args: {
    timing: 1,
    size: 50,
    width: 5,
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
