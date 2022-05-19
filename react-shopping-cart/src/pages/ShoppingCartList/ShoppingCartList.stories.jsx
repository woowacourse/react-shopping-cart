import ShoppingCartList from './ShoppingCartList.page';

export default {
  title: 'Pages/ShoppingCartList',
  component: ShoppingCartList,
};

export const DefaultShoppingCartList = args => <ShoppingCartList {...args} />;
DefaultShoppingCartList.args = {};
