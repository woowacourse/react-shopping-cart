import React, { useEffect } from 'react';
import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import ProductList from '../../components/product/ProductList/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductListAsync } from '../../store/actions/product';

export default function Home() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);

  useEffect(() => {
    dispatch(fetchProductListAsync());
  }, []);
  return <PageTemplate>{productList && <ProductList productList={productList} />}</PageTemplate>;
}
