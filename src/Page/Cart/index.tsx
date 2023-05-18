import { ReactComponent as AlertBlank } from '../../assets/baemin-alert-blank.svg';
import { useRecoilValue } from 'recoil';
import CartProductItemList from '../../components/CartProductItemList';
import PaymentsView from '../../components/PaymentsView';
import styles from './index.module.scss';
import { $CartIdList, $CartTotalPrice } from '../../recoil/atom';
import Header from '../../components/Header';

function Cart() {
  const cartTotalPrice = useRecoilValue($CartTotalPrice);
  const cartIdList = useRecoilValue($CartIdList);

  if (cartIdList.length > 0) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <h2 className={styles.title}>장바구니</h2>
          <section className={styles['main-view']}>
            <CartProductItemList />
            <PaymentsView priceTotal={cartTotalPrice} parcelPrice={3000} />
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <h2 className={styles.title}>장바구니</h2>
        <section className={styles['main-view-blank']}>
          <AlertBlank />
          <p>장바구니가 비어있어요!</p>
        </section>
      </main>
    </>
  );
}

export default Cart;
