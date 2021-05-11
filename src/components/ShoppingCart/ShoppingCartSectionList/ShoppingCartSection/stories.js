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
  items: ORDER_LIST_MOCK[0].items,
};
