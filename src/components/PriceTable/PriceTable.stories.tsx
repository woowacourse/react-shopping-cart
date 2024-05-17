import type { Meta, StoryObj } from '@storybook/react';
import PriceTable from './PriceTable';

const meta = {
  title: 'Components/PriceTable',
  component: PriceTable,
  tags: ['autodocs'],
} satisfies Meta<typeof PriceTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [
    () => {
      return (
        <div style={{ width: '380px' }}>
          <PriceTable />
        </div>
      );
    },
  ],
};
