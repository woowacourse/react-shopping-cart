import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import { cartHandler } from '../../../mocks/handlers';

const meta = {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
  parameters: { msw: cartHandler },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
