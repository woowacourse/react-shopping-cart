import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { PATH } from '../../constants/rule';

import Header from './Header';

interface HeaderStoryArgs {
  path: string;
}

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
  decorators: [
    (Story, context) => {
      const { path } = context.args as HeaderStoryArgs;
      return (
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="*" element={<Story />} />
          </Routes>
        </MemoryRouter>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<HeaderStoryArgs>;

export const Default: Story = {
  args: {
    path: PATH.CartPage,
  },
};

export const OrderConfirm: Story = {
  args: {
    path: PATH.OrderConfirmPage,
  },
};
