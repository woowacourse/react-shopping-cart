import styles from './index.module.css';
import { cartItems } from '../../data/mockData';
import { CartItem } from '../../types';
import CartProduct from '../CartProduct';
import { useRecoilValue } from 'recoil';
import { $Cart } from '../../recoil/atom';
import { SyntheticEvent, createRef, useRef, useState } from 'react';

const CartProductList = () => {
  const cart = useRecoilValue($Cart);
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = cart.map(() => createRef<HTMLInputElement>());

  const [selectedCount, setSelectedCount] = useState(0);

  const handleCheckboxChanged = (event: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = event.target as HTMLInputElement;
    const data = new FormData(formRef.current);
    const count = data.getAll('select-item').length;

    if (targetInput.classList.contains('select-all')) {
      // select-all 선택시
      const checked = targetInput.checked;
      checkboxRefs.forEach(inputElement => {
        inputElement.current!.checked = checked;
      });
      setSelectedCount(checked ? cart.length : 0);
    } else {
      // 개별아이템 선택시
      const checked = count === cart.length;
      formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = checked;
      setSelectedCount(count);
    }
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <form className={styles.container} ref={formRef} onChange={handleCheckboxChanged} onSubmit={handleSubmit}>
      <header className={styles['cart-product-list-title']}>
        <h1>든든배송 상품 ({cart.length}개)</h1>
      </header>
      <main className={styles['cart-product-list-container']}>
        {cartItems.map((item: CartItem, i: number) => (
          <CartProduct key={item.id} cartItem={item} ref={checkboxRefs[i]} />
        ))}
      </main>
      <div className={styles['choice-action-container']}>
        <input className="select-all" name="select-all" type="checkbox" />
        <span>
          전체선택 ({selectedCount}/{cart.length})
        </span>
        <button>선택삭제</button>
      </div>
    </form>
  );
};

export default CartProductList;
