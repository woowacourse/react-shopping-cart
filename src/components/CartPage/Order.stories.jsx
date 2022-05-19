import Order from 'components/CartPage/Order';

export default {
  title: 'Order',
  component: Order,
};

function Template(args) {
  return <Order {...args} />;
}

export const DefaultOrder = Template.bind({});

DefaultOrder.args = {
  expectedPrice: '12,400',
  quantity: '3',
};
