import { within } from '@testing-library/react';
import CountButton from '../components/CountButton';
import type { Meta, StoryObj } from '@storybook/react';
import userEvent from '@testing-library/user-event';

type Story = StoryObj<typeof CountButton>;
const meta: Meta<typeof CountButton> = {
  title: 'CountButton',
  component: CountButton,
};
export default meta;

export const Default: Story = {
  args: {
    getCount: () => {},
  },
  play: async ({}) => {
    userEvent.tab();
    await new Promise(resolve => {
      setTimeout(resolve, 200);
    });
    userEvent.click(document.activeElement as HTMLElement);
    await new Promise(resolve => {
      setTimeout(resolve, 200);
    });
    userEvent.click(document.activeElement as HTMLElement);
    await new Promise(resolve => {
      setTimeout(resolve, 200);
    });
    userEvent.click(document.activeElement as HTMLElement);
    await new Promise(resolve => {
      setTimeout(resolve, 200);
    });
    userEvent.tab();
    userEvent.click(document.activeElement as HTMLElement);
    await new Promise(resolve => {
      setTimeout(resolve, 200);
    });
    userEvent.click(document.activeElement as HTMLElement);
    await new Promise(resolve => {
      setTimeout(resolve, 200);
    });
    userEvent.click(document.activeElement as HTMLElement);
    await new Promise(resolve => {
      setTimeout(resolve, 200);
    });
    userEvent.click(document.activeElement as HTMLElement);
  },
};
