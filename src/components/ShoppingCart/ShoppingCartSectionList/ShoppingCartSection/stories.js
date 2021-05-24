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
      cart_id: 1,
      image_url: 'https://picsum.photos/200/200',
      name: 'test cart item name',
      price: 43400,
      quantity: 2,
      checked: true,
    },
    {
      cart_id: 2,
      image_url: 'https://picsum.photos/200/200',
      name: 'test cart item name',
      price: 43400,
      quantity: 2,
      checked: true,
    },
  ],
};
