import styles from './index.module.css';
import CartProductList from '../../components/CartProductList';
import PaymentAmount from '../../components/PaymentAmount';
import { useRecoilValue } from 'recoil';
import { $Cart } from '../../recoil/atom';
import { useEffect } from 'react';

const Cart = () => {
  const cart = useRecoilValue($Cart);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <section className={styles.container}>
      <header className={styles.title}>
        <h2>장바구니</h2>
      </header>
      {cart.length === 0 ? (
        <span>저희가 도와드릴 수 있도록 상품을 선택해주세요.</span>
      ) : (
        <main className={styles['cart-container']}>
          <CartProductList />
          <PaymentAmount />
        </main>
      )}
    </section>
  );
};

export default Cart;
