import NotFound from '@Pages/NotFound';

import { Product } from '@Types/index';

import useFetch from '@Hooks/useFetch';

import { FETCH_URL } from '@Constants/index';

import ProductList from './ProductList';

function Home() {
  const { data, status } = useFetch<Product[]>(FETCH_URL.products);

  if (status === 'error') {
    return <NotFound />;
  }

  return <ProductList data={data} isLoading={status === 'loading'} />;
}

export default Home;
