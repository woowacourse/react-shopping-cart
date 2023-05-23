/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { MESSAGE } from '../../constants';
import useGetQuery from '../../hooks/useGetQuery';
import useToast from '../../hooks/useToast';
import { Product } from '../../types';
import LoadingView from '../Common/LoadingView';
import ProductItem from '../ProductItem';
import styles from './index.module.scss';

function ProductItemList() {
  const { data: productsData, loading, error } = useGetQuery<Product[]>('./products');
  const Toast = useToast();

  useEffect(() => {
    if (error) {
      Toast.error(MESSAGE.PRODUCT_GET_FAILED);
    }
  }, [error]);

  if (loading) {
    return <LoadingView />;
  }

  return (
    <section className={styles.container}>
      {productsData?.map((item: Product) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </section>
  );
}

export default ProductItemList;
