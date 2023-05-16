import { useRecoilValue } from 'recoil';
import CartProductItemList from '../../components/CartProductItemList';
import PaymentsView from '../../components/PaymentsView';
import styles from './index.module.scss';
import { $CartTotalPrice } from '../../recoil/atom';

function Cart() {
  const cartTotalPrice = useRecoilValue($CartTotalPrice);

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>장바구니</h2>
      <section className={styles['main-view']}>
        <CartProductItemList />
        <PaymentsView priceTotal={cartTotalPrice} parcelPrice={3000} />
      </section>
    </main>
  );
}

export default Cart;
