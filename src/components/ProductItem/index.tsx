import AddCartButton from '../AddCartButton';
import styles from './index.module.scss';
import type { Product } from '../../types';

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  const { name, imageUrl, price, id } = product;

  return (
    <div className={styles.container}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles['item-info']}>
        <div>
          <div className={styles.name}>{name}</div>
          <AddCartButton productId={id} />
        </div>
        <div>{price.toLocaleString()} 원</div>
      </div>
    </div>
  );
}

export default ProductItem;
