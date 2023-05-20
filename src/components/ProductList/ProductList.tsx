import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { useFetch } from '../../hooks/useFetch';
import productListState from '../../store/product';
import { ProductItemType } from '../../types';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ProductItem from '../ProductItem/ProductItem';
import styles from './styles.module.css';

const ProductList = () => {
  const [, setList] = useRecoilState(productListState);

  const { data, fetchApi, isLoading } = useFetch<ProductItemType[]>(setList);
  useEffect(() => {
    fetchApi.get('/productlist');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner />}
      {data?.map((productItem) => (
        <ProductItem key={productItem.id} information={productItem} />
      ))}
    </div>
  );
};

export default ProductList;
