import ProductListPage from 'components/Main/ProductListPage';

export default {
  title: 'ProductListPage',
  component: ProductListPage,
};

function Template() {
  return <ProductListPage />;
}

export const DefaultProductListContainer = Template.bind({});

DefaultProductListContainer.args = {};
