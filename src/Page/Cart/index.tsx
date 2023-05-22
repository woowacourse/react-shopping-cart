import { useRecoilValue } from 'recoil';
import { ReactComponent as AlertBlank } from '../../assets/baemin-alert-blank.svg';
import CartProductItemList from '../../components/CartProductItemList';
import PaymentsView from '../../components/PaymentsView';
import { PARCEL_PRICE } from '../../constants';
import useCart from '../../hooks/useCart';
import { $CheckedCartIdList } from '../../recoil/atom';
import styles from './index.module.scss';

function Cart() {
  const { cartItemStateList, cartIdList, deleteCartItem, mutateQuantity } = useCart();
  const checkedCartIdList = useRecoilValue($CheckedCartIdList);

  const total = cartItemStateList?.reduce((acc, { id, product, quantity }) => {
    if (checkedCartIdList.includes(id)) {
      return product.price * quantity + acc;
    }
    return acc;
  }, 0);

  if (cartIdList.length > 0) {
    return (
      <main className={styles.container}>
        <h2 className={styles.title}>장바구니</h2>
        <section className={styles['main-view']}>
          <CartProductItemList
            cartItemList={cartItemStateList}
            deleteCartItem={deleteCartItem}
            mutateQuantity={mutateQuantity}
          />
          <PaymentsView priceTotal={total} parcelPrice={PARCEL_PRICE} />
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
