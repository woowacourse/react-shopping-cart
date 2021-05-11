import ProductList from '../../components/ProductList';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import useFetch from '../../hooks/useFetch';
import { requestProductList } from '../../service/request/productList';
import { Product } from '../../types';

const ProductListPage = () => {
  const productList = useFetch(requestProductList);

  return (
    <ReactShoppingCartTemplate>
      {productList.isLoading ? (
        <div>로딩중...</div>
      ) : (
        <ProductList products={productList.data as Product[]} />
      )}
    </ReactShoppingCartTemplate>
  );
};

export default ProductListPage;
