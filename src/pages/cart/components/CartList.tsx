import { CartItemType } from '../../../types';
import CartItem from './CartItem';
import useToggleAllChecked from '../../../hooks/useToggleAllChecked';
import styles from '../Cart.module.css';
import common from '../../../styles/common.module.css';

interface Props {
  products: CartItemType[];
}

export default function CartList({ products }: Props) {
  const { handleToggleAll, allChecked, setAllChecked } = useToggleAllChecked({ products });

  return (
    <>
      <div className={styles.allCheckContainer}>
        <input
          type="checkbox"
          id={'checkAll'}
          className={styles.customCheckbox}
          checked={allChecked}
          onChange={handleToggleAll}
        />
        <label htmlFor={'checkAll'} className={styles.customCheckboxLabel} />
        <div className={`${styles.allCheckText} ${common.captionText}`}>전체 선택</div>
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
              setAllChecked={setAllChecked}
            />
          );
        })}
      </ul>
    </>
  );
}
