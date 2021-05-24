import ShoppingCartItem from '.';
import { CART_ITEM_LIST_MOCK } from '../../../../../mocks/mockData';

export default {
  component: ShoppingCartItem,
  title: 'components/ShoppingCart/ShoppingCartSectionList/ShoppingCartSection/ShoppingCartItem',
  argTypes: {
    changeQuantity: { action: 'changeQuantity' },
    deleteItem: { action: 'deleteItem' },
    changeChecked: { action: 'changeChecked' },
  },
};

const Template = (args) => (
  <ul>
    <ShoppingCartItem {...args} />
  </ul>
);

export const Default = Template.bind({});

Default.args = {
  item: {
    cart_id: 1,
    image_url: 'https://picsum.photos/200/200',
    name: 'test cart item name',
    price: 43400,
    quantity: 2,
    checked: true,
  },
};
