import { api } from 'apis/products/api';
import { Loading } from 'components/@common/Loading';
import ProductCardList from 'components/ProductCardList/ProductCardList';
import { useFetch } from 'hooks/useFetch';
import { Product } from 'types/product';

const ProductListPage = () => {
  const { data, isLoading, error, fetchData } = useFetch<Product[]>(api.getProducts);

  if (error) {
    return (
      <>
        <p>{error.message}</p>
        <button onClick={() => fetchData()}>다시 요청하기</button>
      </>
    );
  }

  return isLoading ? <Loading /> : <ProductCardList products={data ?? []} />;
};

export default ProductListPage;
