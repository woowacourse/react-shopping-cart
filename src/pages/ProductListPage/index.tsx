import { VFC } from 'react';
import Loading from '../../components/Loading';
import ProductList from '../../components/ProductList';
import Template from '../../components/shared/Template';
import useFetch from '../../hooks/useFetch';
import { requestProductList } from '../../service/request/productList';

const ProductListPage: VFC = () => {
  const productList = useFetch(requestProductList);

  return (
    <Template>
      <Loading isLoading={productList.isLoading}>
        <ProductList products={productList.data ?? []} />
      </Loading>
    </Template>
  );
};

export default ProductListPage;
