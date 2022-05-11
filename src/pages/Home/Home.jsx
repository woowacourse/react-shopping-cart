import React, { useEffect } from 'react';
import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import ProductList from '../../components/product/ProductList/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductListAsync } from '../../store/actions/product';
import Pagination from '../../components/common/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);

  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') ?? 1;

  useEffect(() => {
    dispatch(fetchProductListAsync(currentPage));
  }, [currentPage]);

  return (
    <PageTemplate>
      {productList && (
        <>
          <ProductList productList={productList} />
          <Pagination />
        </>
      )}
    </PageTemplate>
  );
}
