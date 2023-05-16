import ProductList from '@Components/ProductList';

import { Product } from '@Types/index';

import useFetch from '@Hooks/useFetch';

import { MOCK_DATA_URL } from '@Constants/index';

function ProductListPage() {
  const { data, isLoading } = useFetch<Product[]>(MOCK_DATA_URL);
  return (
    <>
      <ProductList data={data} isLoading={isLoading} />
    </>
  );
}

export default ProductListPage;
