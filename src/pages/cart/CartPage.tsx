import { useRecoilValue } from 'recoil';
import CartPageHeader from './components/CartPageHeader';
import { allCartItemStates } from '@/store/atoms';
import OrderButton from './components/OrderButton';
import { Cart } from './components/Cart';
import styles from './Cart.module.css';

export default function CartPage() {
  const isExistingCartItem = !!useRecoilValue(allCartItemStates).length;

  return (
    <>
      <CartPageHeader />
      {isExistingCartItem ? (
        <div className={styles.page_wrapper}>
          <Cart>
            <Cart.Title />
            <Cart.List />
            <Cart.Result />
          </Cart>
        </div>
      ) : (
        <div className={styles.noneProductContainer}>장바구니에 담은 상품이 없습니다.</div>
      )}
      <OrderButton />
    </>
  );
}
