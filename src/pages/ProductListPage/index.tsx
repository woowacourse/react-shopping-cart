import ProductList from '@Components/ProductList';

import { Product } from '@Types/index';

import { useMockFetch } from '@Hooks/useMockFetch';

import MockData from '../../mockData.json';

function ProductListPage() {
  const { data, isLoading } = useMockFetch<Product[]>(MockData);
  return (
    <>
      <ProductList data={data} isLoading={isLoading} />
    </>
  );
}

export default ProductListPage;
