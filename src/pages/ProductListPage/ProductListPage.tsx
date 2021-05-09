import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../../modules/product';
import { RootState } from '../../modules';
import ProductGridItem from '../../components/ProductListPage/ProductGridItem/ProductGridItem';

import * as Styled from './ProductListPage.styles';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productGridItemList = products.map((product: Product) => (
    <ProductGridItem key={product.id} name={product.name} price={product.price} thumbnail={product.thumbnail} />
  ));

  return <Styled.ProductListPage>{productGridItemList}</Styled.ProductListPage>;
};

export default ProductListPage;
