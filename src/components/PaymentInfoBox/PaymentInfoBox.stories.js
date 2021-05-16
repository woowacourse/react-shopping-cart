import PaymentInfoBox from './PaymentInfoBox';

export default {
  title: 'ShoppingCart/PaymentInfoBox',
  component: PaymentInfoBox,
  argTypes: { children: { control: 'text' } },
};

const Template = args => <PaymentInfoBox {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  title: '결제예상금액',
  detailText: '결제예상금액',
  price: '21,700',
  buttonText: '주문하기(2개)',
  onClickPaymentButton: () => alert('주문하기 버튼 클릭'),
};
