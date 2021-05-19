import ShoppingCartItem from '.';
import { CART_ITEM_LIST_MOCK } from '../../../../../mocks/mockData';

export default {
  component: ShoppingCartItem,
  title: 'components/ShoppingCart/ShoppingCartSectionList/ShoppingCartSection/ShoppingCartItem',
  argTypes: {
    changeQuantity: { action: 'changeQuantity' },
    deleteItem: { action: 'deleteItem' },
    toggleChecked: { action: 'toggleChecked' },
  },
};

const Template = (args) => (
  <ul>
    <ShoppingCartItem {...args} />
  </ul>
);

export const Default = Template.bind({});

Default.args = {
  item: CART_ITEM_LIST_MOCK[0],
};
