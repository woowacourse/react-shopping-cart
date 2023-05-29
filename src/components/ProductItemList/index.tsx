import ProductItem from '../ProductItem';
import styles from './index.module.css';
import { Product } from '../../types';
import useFetchProducts from '../../hooks/useFetchProducts';

const ProductItemList = () => {
  const products = useFetchProducts();

  return (
    <section className={styles.container}>
      {products.map((item: Product) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </section>
  );
};

export default ProductItemList;
