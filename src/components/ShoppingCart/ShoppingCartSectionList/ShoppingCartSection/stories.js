import ShoppingCartItemList from '.';
import { ORDER_LIST_MOCK } from '../../../../mocks/mockData';

export default {
  component: ShoppingCartItemList,
  title: 'components/ShoppingCart/ShoppingCartSectionList/ShoppingCartSection',
};

const Template = (args) => <ShoppingCartItemList {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'ShoppingCartSection TEST',
  items: [
    {
      cartId: 1,
      imageUrl: 'https://picsum.photos/200/200',
      name: 'test cart item name',
      price: 43400,
      quantity: 2,
      checked: true,
    },
    {
      cartId: 2,
      imageUrl: 'https://picsum.photos/200/200',
      name: 'test cart item name',
      price: 43400,
      quantity: 2,
      checked: true,
    },
  ],
};
