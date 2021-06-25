import { FC } from 'react';
import ProductList from '../../components/ProductList';
import InitialLoading from '../../components/shared/InitialLoading';
import RootTemplate from '../../components/shared/RootTemplate';
import useRequest from '../../hooks/shared/useRequest';
import { getProductList } from '../../service/productList';
import { Product } from '../../types';

const ProductListPage: FC = () => {
  const productList = useRequest(getProductList);

  return (
    <RootTemplate>
      <InitialLoading isLoading={productList.isLoading}>
        <ProductList products={productList.data as Product[]} />
      </InitialLoading>
    </RootTemplate>
  );
};

export default ProductListPage;
