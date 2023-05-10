import { useRecoilValue } from 'recoil';
import ProductItem from '../ProductItem';
import { Product } from '../ProductItem/types';
import styles from './index.module.css';
import { getProductSelector } from '../../recoil/atom';

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
