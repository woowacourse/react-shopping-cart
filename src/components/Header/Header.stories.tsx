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
  render: ({ type }) => {
    return (
      <BrowserRouter>
        <div style={{ height: '160px' }}>
          <Header type={type} />
        </div>
      </BrowserRouter>
    );
  },
};
