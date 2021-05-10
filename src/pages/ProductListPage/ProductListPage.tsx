import { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import ProductGridItem from '../../components/ProductListPage/ProductGridItem/ProductGridItem';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';

import useProducts from '../../hooks/products';

import { PATH } from '../../constants';
import { getMoneyString } from '../../utils/format';

import * as Styled from './ProductListPage.styles';

const ProductListPage = () => {
  const history = useHistory();
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    if (products.length !== 0) return;
    fetchProducts();
  }, [fetchProducts, products]);

  const onProductItemClick = (productId: string) => {
    history.push({ pathname: `${PATH.PRODUCT_DETAIL}/${productId}`, state: { productId } });
  };

  const productGridItemList = products.map((product: Product) => (
    <ProductGridItem
      onClick={() => onProductItemClick(product.id)}
      key={product.id}
      name={product.name}
      price={getMoneyString(product.price)}
      thumbnail={product.thumbnail}
    />
  ));

  if (loading) {
    return <Loading />;
  }

  if (!loading && error) {
    return <NotFound message="상품 정보를 불러올 수 없습니다." />;
  }

  return <Styled.ProductListPage>{productGridItemList}</Styled.ProductListPage>;
};

export default ProductListPage;
