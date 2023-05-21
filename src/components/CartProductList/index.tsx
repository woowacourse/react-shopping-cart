import styles from './index.module.css';
import { cartItems } from '../../data/mockData';
import { CartItem } from '../../types';
import CartProduct from '../CartProduct';
import { useRecoilValue } from 'recoil';
import { $Cart } from '../../recoil/atom';

const CartProductList = () => {
  const cart = useRecoilValue($Cart);
  return (
    <section className={styles.container}>
      <header className={styles['cart-product-list-title']}>
        <h1>든든배송 상품 ({cart.length}개)</h1>
      </header>
      <main className={styles['cart-product-list-container']}>
        {cartItems.map((item: CartItem) => (
          <CartProduct key={item.id} cartItem={item} />
        ))}
      </main>
      <div className={styles['choice-action-container']}>
        <input type="checkbox" />
        <span>전체선택 (2/3)</span>
        <button>선택삭제</button>
      </div>
    </section>
  );
};

export default CartProductList;
