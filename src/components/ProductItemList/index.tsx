/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import styles from './index.module.scss';
import { $Products } from '../../recoil/atom';
import { useRecoilState } from 'recoil';
import { Product } from '../../types';
import useGetApi from '../../hooks/useGetApi';

function ProductItemList() {
  const [products, setProducts] = useRecoilState($Products);
  const { data: productsData, loading } = useGetApi<Product[]>('./products');

  useEffect(() => {
    if (productsData && !loading) {
      setProducts(productsData);
    }
  }, []);

  return (
    <section className={styles.container}>
      {products.map((item: Product) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </section>
  );
}

export default ProductItemList;
