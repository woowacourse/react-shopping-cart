import ProductListContainer from './ProductListContainer';

export default {
  title: 'ProductListContainer',
  component: ProductListContainer,
};

function Template() {
  return <ProductListContainer />;
}

export const DefaultProductListContainer = Template.bind({});

DefaultProductListContainer.args = {};
