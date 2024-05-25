import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { PriceTable } from './PriceTable';

const meta = {
  title: 'Components/PriceTable',
  component: PriceTable,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof PriceTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: <></>,
  },
  render: () => {
    return (
      <RecoilRoot>
        <div style={{ width: '380px' }}>
          <PriceTable>
            <PriceTable.Row name="주문 금액" price={70000} />
            <PriceTable.Row name="총 결제 금액" price={70000} upperDivider />
          </PriceTable>
        </div>
      </RecoilRoot>
    );
  },
};
