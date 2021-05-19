import { VFC } from 'react';
import Loading from '../../components/Loading';
import ProductList from '../../components/ProductList';
import Template from '../../components/shared/Template';
import useFetch from '../../hooks/useFetch';
import { requestProductList } from '../../service/request/productList';
import { Product } from '../../types';

const ProductListPage: VFC = () => {
  const productList = useFetch(requestProductList);

  return (
    <Template>
      {productList.isLoading ? (
        <Loading />
      ) : (
        <ProductList products={productList.data as Product[]} />
      )}
    </Template>
  );
};

export default ProductListPage;
