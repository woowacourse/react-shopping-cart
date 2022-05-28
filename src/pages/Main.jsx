import ProductListContainer from 'components/ProductList/ProductListContainer';

import useLoadProducts from 'hooks/useLoadProducts';

function Main() {
  useLoadProducts();

  return <ProductListContainer />;
}

export default Main;
