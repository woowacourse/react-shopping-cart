import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import ShoppingCartOverview from './ShoppingCartOverview';

const meta = {
  title: 'ShoppingCartOverview',
  component: ShoppingCartOverview,
  decorators: [withRouter],
} satisfies Meta<typeof ShoppingCartOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {};
