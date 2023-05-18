import CountButton from '../components/Common/CountButton';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof CountButton>;
const meta: Meta<typeof CountButton> = {
  title: 'Common/CountButton',
  component: CountButton,
};
export default meta;

export const Default: Story = {
  args: { count: 1 },
};
