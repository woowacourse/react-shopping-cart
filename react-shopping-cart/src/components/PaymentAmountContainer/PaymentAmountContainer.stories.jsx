import PaymentAmountContainer from './PaymentAmountContainer.component';

export default {
  title: 'Components/PaymentAmountContainer',
  component: PaymentAmountContainer,
};

export const Default = args => <PaymentAmountContainer {...args} />;
Default.args = {
  count: 2,
};
