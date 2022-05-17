import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProductListAsync } from '../store/actions/product';

export default function useProductList() {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? 1;

  useEffect(() => {
    dispatch(fetchProductListAsync(currentPage));
  }, [currentPage]);

  const { isLoading, productList, pageCount } = useSelector(({ product }) => product);

  return { isLoading, productList, pageCount, currentPage };
}
