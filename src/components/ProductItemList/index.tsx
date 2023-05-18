/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import useGetQuery from '../../hooks/useGetQuery';
import { $ToastStateList } from '../../recoil/atom';
import { Product } from '../../types';
import LoadingView from '../Common/LoadingView';
import ProductItem from '../ProductItem';
import styles from './index.module.scss';

function ProductItemList() {
  const { data: productsData, loading, error } = useGetQuery<Product[]>('./products');
  const setToastStateList = useSetRecoilState($ToastStateList);

  useEffect(() => {
    if (error) {
      setToastStateList(prev => [
        ...prev,
        { type: 'error', message: '제품 목록을 불러오는 과정에서 문제가 생겼습니다.' },
      ]);
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
