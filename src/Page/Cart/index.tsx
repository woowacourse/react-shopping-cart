import styles from './index.module.css';
import CartProductList from '../../components/CartProductList';
import PaymentAmount from '../../components/PaymentAmount';

const Cart = () => {
  return (
    <section className={styles.container}>
      <header className={styles.title}>
        <h2>장바구니</h2>
      </header>
      <main className={styles['cart-container']}>
        <CartProductList />
        <PaymentAmount />
      </main>
    </section>
  );
};

export default Cart;
