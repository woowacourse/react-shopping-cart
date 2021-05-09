import ShoppingCartItemList from '.';
import { PRODUCT_LIST_MOCK } from '../../../../mocks/mockData';

export default {
  component: ShoppingCartItemList,
  title: 'components/ShoppingCartItemList',
};

const Template = (args) => <ShoppingCartItemList {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: '',
  items: PRODUCT_LIST_MOCK,
};
