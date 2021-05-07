import PaymentCheckout, { Props } from './PaymentCheckout';

export default {
  title: 'Components/Commons/PaymentCheckout',
  component: PaymentCheckout,
  argTypes: {},
};

const Template = (args: Props) => <PaymentCheckout {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  title: '결제금액',
  priceLabel: '총 결제금액',
  price: '18,900원',
  buttonText: '주문하기(2개)',
};
