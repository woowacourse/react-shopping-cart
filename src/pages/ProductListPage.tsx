import ProductCardList from 'components/ProductCardList/ProductCardList';
import useFetch from 'hooks/useFetch';
import { getProducts } from 'apis/products/get';
import { Product } from 'types/product';
import LoadingErrorCard from '../components/LoadingErrorCard/LoadingErrorCard';

const ProductListPage = () => {
  const { data: products, errorState, isLoading, fetchData } = useFetch<Product[]>(getProducts);

  if (isLoading) return <div>상품목록 로딩중...</div>;
  if (errorState?.isError) return <LoadingErrorCard onClickRetryButton={fetchData} />;

  return <ProductCardList products={products ?? []} />;
};

export default ProductListPage;
