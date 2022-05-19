import CartHeader from 'components/CartPage/CartHeader';

export default {
  title: 'CartHeader',
  component: CartHeader,
};

function Template(args) {
  return <CartHeader {...args} />;
}

export const DefaultCartHeader = Template.bind({});

DefaultCartHeader.args = {};
