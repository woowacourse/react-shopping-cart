import ProductItem from '../ProductItem';
import { Product } from '../ProductItem/types';
import styles from './index.module.css';

interface ProductItemListProps {
  products: Product[];
}

const ProductItemList = ({ products }: ProductItemListProps) => {
  return (
    <section className={styles.container}>
      {products.map(item => (
        <ProductItem key={item.id} product={item} />
      ))}
    </section>
  );
};

export default ProductItemList;
