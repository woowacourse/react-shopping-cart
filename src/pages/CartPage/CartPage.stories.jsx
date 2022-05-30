import CartPage from './CartPage';

export default {
  title: 'Page/CartPage',
  component: CartPage,
};

function Template(args) {
  return <CartPage {...args} />;
}

export const Default = Template.bind({});
