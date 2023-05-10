import { useRecoilValue } from 'recoil';
import ProductItem from '../ProductItem';
import styles from './index.module.css';
import { getProductSelector } from '../../recoil/atom';
import type { Product } from '../../types';

const ProductItemList = () => {
  const products = useRecoilValue(getProductSelector);
  return (
    <section className={styles.container}>
      {products.map((item: Product) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </section>
  );
};

export default ProductItemList;
