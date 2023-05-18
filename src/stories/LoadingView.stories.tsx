import LoadingView from '../components/Common/LoadingView';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof LoadingView>;
const meta: Meta<typeof LoadingView> = {
  title: 'Common/LoadingView',
  component: LoadingView,
};
export default meta;

export const Default: Story = { args: {} };
