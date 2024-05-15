import { CartItemType } from '../../../types';
import CartItem from './CartItem';
import styles from '../Cart.module.css';
import { useState } from 'react';
import { useRecoilCallback } from 'recoil';
import { isCheckedState } from '../../../store/atoms';

interface Props {
  products: CartItemType[];
}

export default function CartList({ products }: Props) {
  const [allChecked, setAllChecked] = useState(true);

  const handleToggleAll = useRecoilCallback(
    ({ set }) =>
      () => {
        const newAllChecked = !allChecked;
        setAllChecked(newAllChecked);

        products.forEach((product) => {
          set(isCheckedState(product.id), newAllChecked);
          window.localStorage.setItem(JSON.stringify(product.id), JSON.stringify(newAllChecked));
        });
      },
    [allChecked, products],
  );

  return (
    <>
      <div className={styles.allCheckContainer}>
        <input
          type="checkbox"
          id={'checkAll'}
          className={styles.customCheckbox}
          checked={allChecked}
          onChange={handleToggleAll}
        ></input>
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
              setAllChecked={setAllChecked}
            />
          );
        })}
      </ul>
    </>
  );
}
