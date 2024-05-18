import { useRecoilValue } from 'recoil';
import CartList from './components/CartList';
import CartTitle from './components/CartTitle';
import CartTotals from './components/CartTotals';
import CartPageHeader from './components/CartPageHeader';
import { allCartItemStates } from '@/store/atoms';
import OrderButton from './components/OrderButton';

import styles from './Cart.module.css';

export default function CartPage() {
  const cartItems = useRecoilValue(allCartItemStates);
  const isExistingCartItem = cartItems.length > 0;

  console.log(cartItems);

  return (
    <>
      <CartPageHeader />
      {isExistingCartItem ? (
        <div className={styles.cartBodyWrapper}>
          <CartTitle cartItemsCount={cartItems.length} />
          <CartList cartItems={cartItems} />
          <CartTotals />
        </div>
      ) : (
        <div className={styles.noneProductContainer}>장바구니에 담은 상품이 없습니다.</div>
      )}
      <OrderButton />
    </>
  );
}
