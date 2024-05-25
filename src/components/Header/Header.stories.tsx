import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: '',
      control: { type: 'radio' },
      options: ['logo', 'back'],
    },
  },
  args: {
    type: 'logo',
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [
    () => {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header type="logo" />} />
          </Routes>
        </BrowserRouter>
      );
    },
  ],
};
