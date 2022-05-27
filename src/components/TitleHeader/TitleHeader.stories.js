import TitleHeader from 'components/TitleHeader';

export default {
  title: 'components/TitleHeader',
  component: TitleHeader,
};

const Template = (args) => <TitleHeader {...args} />;

export const Cart = Template.bind({});

Cart.args = {
  children: '장바구니',
};

export const Order = Template.bind({});

Order.args = {
  children: '주문/결제',
};
