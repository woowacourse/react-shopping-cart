import { CartItemType } from '../../../types';
import CartItem from './CartItem';
import styles from '../Cart.module.css';

interface Props {
  products: CartItemType[];
}

export default function CartList({ products }: Props) {
  return (
    <>
      <div className={styles.allCheckContainer}>
        <input type="checkbox" id={'checkAll'} className={styles.customCheckbox}></input>
        <label htmlFor={'checkAll'} className={styles.customCheckboxLabel}></label>
        <div className={styles.allCheckText}>전체 선택</div>
      </div>

      <ul>
        {products.map((product) => {
          return (
            <CartItem
              key={product.id}
              id={product.id}
              quantity={product.quantity}
              name={product.product.name}
              price={product.product.price}
              category={product.product.category}
              imageUrl={product.product.imageUrl}
            />
          );
        })}
      </ul>
    </>
  );
}
