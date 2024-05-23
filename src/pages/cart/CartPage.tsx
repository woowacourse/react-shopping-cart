import CartPageHeader from './components/CartPageHeader';
import OrderButton from './components/OrderButton';
import { Cart } from './components/Cart';

import styles from './Cart.module.css';
import { useCartManager } from '@/store/custom/useCartManager';

export default function CartPage() {
  const { totalCartItems } = useCartManager();
  const isExistingCartItem = !!totalCartItems.length;

  return (
    <>
      <CartPageHeader />
      {isExistingCartItem ? (
        <Cart.Wrapper>
          <Cart.Title />
          <Cart.List />
          <Cart.Result />
        </Cart.Wrapper>
      ) : (
        <div className={styles.noneProductContainer}>장바구니에 담은 상품이 없습니다.</div>
      )}
      <OrderButton />
    </>
  );
}
