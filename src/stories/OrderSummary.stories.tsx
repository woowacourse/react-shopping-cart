import { Meta } from '@storybook/react';
import { OrderSummarySection } from '../components/cartPage/orderSummarySection/OrderSummarySection';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from '../GlobalStyle';

const meta = {
  title: 'OrderSummary',
  component: OrderSummarySection,
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <Story />
          <GlobalStyle />
        </RecoilRoot>
      );
    },
  ],
} as Meta;

export default meta;

export const OrderSummaryComponent = () => {
  return <OrderSummarySection />;
};
