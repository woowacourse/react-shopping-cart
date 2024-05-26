import CartPageHeader from './components/CartPageHeader';
import OrderButton from './components/OrderButton';
import styles from './Cart.module.css';
import { useCartManager } from '@/store/custom/useCartManager';
import CartTitle from './components/CartTitle';
import CartList from './components/CartList';
import CartTotals from './components/CartTotals';

export default function CartPage() {
  const { totalCartItems } = useCartManager();
  const isExistingCartItem = !!totalCartItems.length;

  return (
    <>
      <CartPageHeader />
      {isExistingCartItem ? (
        <div className={styles.page_wrapper}>
          <CartTitle />
          <CartList />
          <CartTotals />
        </div>
      ) : (
        <div className={styles.noneProductContainer}>장바구니에 담은 상품이 없습니다.</div>
      )}
      <OrderButton />
    </>
  );
}
