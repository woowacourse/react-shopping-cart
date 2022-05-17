import Title from 'components/Title';

export default {
  title: 'components/Title',
  component: Title,
};

const Template = (args) => <Title {...args} />;

export const Cart = Template.bind({});

Cart.args = {
  children: '장바구니',
};

export const Order = Template.bind({});

Order.args = {
  children: '주문/결제',
};
