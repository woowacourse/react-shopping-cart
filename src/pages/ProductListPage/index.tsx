import { FC } from 'react';
import ProductList from '../../components/ProductList';
import InitialLoading from '../../components/shared/InitialLoading';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import useFetch from '../../hooks/shared/useFetch';
import { requestProductList } from '../../service/request/productList';
import { Product } from '../../types';

const ProductListPage: FC = () => {
  const productList = useFetch(requestProductList);

  return (
    <ReactShoppingCartTemplate>
      <InitialLoading isLoading={productList.isLoading}>
        <ProductList products={productList.data as Product[]} />
      </InitialLoading>
    </ReactShoppingCartTemplate>
  );
};

export default ProductListPage;
