import Header from '../components/Header';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Header>;
const meta: Meta<typeof Header> = {
  title: 'Common/Header',
  component: Header,
};
export default meta;

export const Default: Story = { args: {} };
