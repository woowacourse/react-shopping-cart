import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductListAsync } from 'store/actions/product';
import { productSelector } from 'store/selector';

export default function useProductList() {
  const dispatch = useDispatch();
  const { isLoading, productList, pageCount } = useSelector(productSelector);
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') ?? 1;

  useEffect(() => {
    dispatch(fetchProductListAsync(currentPage));
  }, [currentPage]);

  return { isLoading, productList, pageCount, currentPage };
}
