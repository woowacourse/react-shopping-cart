import ProductDetailSection from '.';
import { PRODUCT_LIST_MOCK } from '../../mocks/mockData';

export default {
  title: 'components/ProductDetail/ProductDetailSection',
  component: ProductDetailSection,
};

const Template = (args) => <ProductDetailSection {...args} />;

export const Default = Template.bind({});

Default.args = {
  product: PRODUCT_LIST_MOCK[0],
};
