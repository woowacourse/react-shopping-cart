import PaymentBox from './PaymentBox.component';

export default {
  title: 'Components/PaymentBox',
  component: PaymentBox,
};

export const Default = args => <PaymentBox {...args} />;

Default.args = {
  title: '결제예상금액',
  paymentAmountLabel: '결제예상금액',
  paymentAmount: 123000,
  buttonLabel: '주문하기(2개)',
};
