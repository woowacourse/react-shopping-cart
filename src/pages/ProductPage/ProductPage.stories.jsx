import ProductPage from './ProductPage';
import productsHandlers from '../../mocks/handlers/products';

export default {
  title: 'Page/ProductPage',
  component: ProductPage,
};

function Template(args) {
  return <ProductPage {...args} />;
}

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: {
      products: productsHandlers,
    },
  },
};
