import { Meta, StoryObj } from '@storybook/react';
import { Header } from '../layouts/Header';

const meta = {
  component: Header,
  title: 'Components/Header',
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
