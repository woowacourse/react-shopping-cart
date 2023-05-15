/* eslint-disable react-hooks/exhaustive-deps */
import ProductItem from '../ProductItem';
import styles from './index.module.scss';
import { Product } from '../../types';
import useGetQuery from '../../hooks/useGetQuery';
import { $ToastMessageList } from '../../recoil/atom';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

function ProductItemList() {
  const { data: productsData, error } = useGetQuery<Product[]>('./products');
  const setMessageList = useSetRecoilState($ToastMessageList);

  useEffect(() => {
    if (error) {
      setMessageList(prev => [...prev, '제품 리스트를 불러오는 과정에서 에러가 발생했습니다.']);
    }
  }, [error]);

  return (
    <section className={styles.container}>
      {productsData?.map((item: Product) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </section>
  );
}

export default ProductItemList;
