import { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components/Header';

const meta = {
  component: Header,
  title: 'Common/Header',
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
