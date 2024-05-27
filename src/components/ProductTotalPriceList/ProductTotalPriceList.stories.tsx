import type { Meta, StoryObj } from '@storybook/react';
import ProductTotalPriceList from './ProductTotalPriceList';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';

const meta = {
  title: 'ProductTotalPriceList',
  component: ProductTotalPriceList,
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <Router>
            <Story />
          </Router>
        </RecoilRoot>
      );
    },
  ],
} satisfies Meta<typeof ProductTotalPriceList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
