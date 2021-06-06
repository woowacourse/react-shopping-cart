import { FC } from 'react';
import ProductList from '../../components/ProductList';
import InitialLoading from '../../components/shared/InitialLoading';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import useRequest from '../../hooks/shared/useRequest';
import { requestProductList } from '../../service/request/productList';
import { Product } from '../../types';

const ProductListPage: FC = () => {
  const productList = useRequest(requestProductList);

  return (
    <ReactShoppingCartTemplate>
      <InitialLoading isLoading={productList.isLoading}>
        <ProductList products={productList.data as Product[]} />
      </InitialLoading>
    </ReactShoppingCartTemplate>
  );
};

export default ProductListPage;
