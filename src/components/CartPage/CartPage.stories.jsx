import CartPage from 'components/CartPage/CartPage';

export default {
  title: 'CartPage',
  component: CartPage,
};

function Template(args) {
  return <CartPage {...args} />;
}

export const DefaultCartPage = Template.bind({});

DefaultCartPage.args = {};
