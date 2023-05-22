import { useRecoilValue } from 'recoil';
import { ReactComponent as AlertBlank } from '../../assets/baemin-alert-blank.svg';
import CartProductItemList from '../../components/CartProductItemList';
import PaymentsView from '../../components/PaymentsView';
import { $CartIdList } from '../../recoil/atom';
import styles from './index.module.scss';

function Cart() {
  const cartIdList = useRecoilValue($CartIdList);

  if (cartIdList.length > 0) {
    return (
      <main className={styles.container}>
        <h2 className={styles.title}>장바구니</h2>
        <section className={styles['main-view']}>
          <CartProductItemList />
          <PaymentsView priceTotal={1000000} parcelPrice={3000} />
        </section>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>장바구니</h2>
      <section className={styles['main-view-blank']}>
        <AlertBlank />
        <p>장바구니가 비어있어요!</p>
      </section>
    </main>
  );
}

export default Cart;
