import useFetch from 'hooks/useFetch';
import useCart from 'hooks/useCart';
import { METHOD } from 'constants';
import { useEffect } from 'react';

const useProductListPage = () => {
  const {
    isLoading,
    isError,
    data: products,
    fetchApi,
  } = useFetch({
    method: METHOD.GET,
    url: '/products',
  });

  const { addItem } = useCart();
  const isEmpty = products && !isLoading && products.length === 0;

  useEffect(() => {
    fetchApi();
  }, []);

  const handleClickCartButton = (id) => (e) => {
    e.stopPropagation();
    addItem(id);
  };

  return { isLoading, isError, products, isEmpty, handleClickCartButton };
};

export default useProductListPage;
