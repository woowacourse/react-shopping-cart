import CartProductItemList from '../../components/CartProductItemList';
import PaymentsView from '../../components/PaymentsView';
import styles from './index.module.scss';

function Cart() {
  return (
    <main className={styles.container}>
      <h2 className={styles.title}>장바구니</h2>
      <section className={styles['main-view']}>
        <CartProductItemList />
        <PaymentsView priceList={[1231, 12312, 12312]} parcelPrice={3000} />
      </section>
    </main>
  );
}

export default Cart;
