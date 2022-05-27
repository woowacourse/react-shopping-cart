import CartOrder from 'components/CartOrder';

export default {
  title: 'components/CartOrder',
  component: CartOrder,
};

const Template = (args) => <CartOrder {...args} />;

export const Example = Template.bind({});

Example.args = {
  totalPrice: 143000,
  totalCount: 4,
};
