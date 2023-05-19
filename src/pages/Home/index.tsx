import ProductList from '@Components/ProductList';

import { Product } from '@Types/index';

import useFetch from '@Hooks/useFetch';

import { FETCH_URL } from '@Constants/index';

function Home() {
  const { data, status } = useFetch<Product[]>(FETCH_URL.products);
  console.log(status);

  if (status === 'error') return <div>에러 발생!</div>;
  return <ProductList data={data} isLoading={status === 'loading'} />;
}

export default Home;
