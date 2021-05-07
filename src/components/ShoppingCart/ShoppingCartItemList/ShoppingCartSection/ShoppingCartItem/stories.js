import ShoppingCartItem from '.';
import { PRODUCT_LIST_MOCK } from '../../../../../mock';

export default {
  component: ShoppingCartItem,
  title: 'components/ShoppingCartItemList/ShoppingCartSection/ShoppingCartItem',
};

const Template = (args) => (
  <ul>
    <ShoppingCartItem {...args} />
  </ul>
);

export const Default = Template.bind({});

const [productMock] = PRODUCT_LIST_MOCK;

Default.args = {
  product: productMock,
};
