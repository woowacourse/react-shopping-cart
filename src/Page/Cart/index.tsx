import styles from './index.module.css';
import CartProductList from '../../components/CartProductList';
import PaymentAmount from '../../components/PaymentAmount';
import { useRecoilValue } from 'recoil';
import { $Cart } from '../../recoil/atom';

const Cart = () => {
  const cart = useRecoilValue($Cart);

  return (
    <section className={styles.container}>
      <header className={styles.title}>
        <h2>장바구니</h2>
      </header>
      {cart.length === 0 ? (
        <span>상품이 없습니다.</span>
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
