import ProductList from '@Components/ProductList';

import { Product } from '@Types/index';

import useFetch from '@Hooks/useFetch';

import { PRODUCTS_URL } from '@Constants/index';

function ProductListPage() {
  const { data, status } = useFetch<Product[]>(PRODUCTS_URL);

  if (status === 'error') return <div>에러 발생!</div>;
  return <ProductList data={data} isLoading={status === 'loading'} />;
}

export default ProductListPage;
