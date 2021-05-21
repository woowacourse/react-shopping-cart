import ProductList from '.';
import { PRODUCT_LIST_MOCK } from '../../mocks/mockData';

export default {
  component: ProductList,
  title: 'components/ProductList',
};

const Template = (args) => <ProductList {...args} />;

export const Default = Template.bind({});

Default.args = {
  products: PRODUCT_LIST_MOCK,
};
