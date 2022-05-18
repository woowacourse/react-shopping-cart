import ProductListContainer from 'components/Main/ProductListContainer';

export default {
  title: 'ProductListContainer',
  component: ProductListContainer,
};

function Template() {
  return <ProductListContainer />;
}

export const DefaultProductListContainer = Template.bind({});

DefaultProductListContainer.args = {};
