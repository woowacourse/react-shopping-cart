import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../../modules/product';
import { RootState } from '../../modules';
import ProductGridItem from '../../components/ProductListPage/ProductGridItem/ProductGridItem';
import { PATH } from '../../constants';
import Loading from '../../components/commons/Loading/Loading';

import * as Styled from './ProductListPage.styles';

const ProductListPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const onProductItemClick = (productId: string) => {
    history.push({ pathname: `${PATH.PRODUCT_DETAIL}/${productId}`, state: { productId } });
  };

  const productGridItemList = products.map((product: Product) => (
    <ProductGridItem
      onClick={() => onProductItemClick(product.id)}
      key={product.id}
      name={product.name}
      price={product.price}
      thumbnail={product.thumbnail}
    />
  ));

  return (
    <>
      {loading && <Loading />}
      <Styled.ProductListPage>{productGridItemList}</Styled.ProductListPage>
    </>
  );
};

export default ProductListPage;
