/* eslint-disable react-hooks/exhaustive-deps */
import ProductItem from '../ProductItem';
import styles from './index.module.scss';
import { Product } from '../../types';
import useGetApi from '../../hooks/useGetApi';

function ProductItemList() {
  const { data: productsData } = useGetApi<Product[]>('./products');

  return (
    <section className={styles.container}>
      {productsData?.map((item: Product) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </section>
  );
}

export default ProductItemList;
