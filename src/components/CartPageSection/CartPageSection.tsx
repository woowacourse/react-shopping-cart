import { useRecoilValue } from 'recoil';

import { cartListState } from '../../store/cart';
import { priceFormatter } from '../../utils/formatter';
import CartItem from '../CartItem/CartItem';
import styles from './style.module.css';

const CartPageSection = () => {
  const cartItemList = useRecoilValue(cartListState);
  const deliveryPrice = 3000;
  const resultPrice = cartItemList.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <>
      <div className={styles.cartLstHeader}>장바구니</div>
      <hr />
      <div className={styles.listCount}>든든 배송 상품 ({cartItemList.length}개)</div>
      <section className={styles.section}>
        <div className={styles.cartList}>
          {cartItemList.map((item) => (
            <CartItem quantity={item.quantity} key={item.id} product={item.product} />
          ))}
        </div>
        <div className={styles.orderBox}>
          <div className={styles.orderBoxHeader}>결제예상금액</div>

          <div className={styles.orderPrice}>
            <div>
              <div className={styles.resultText}>
                <div>총 상품가격</div>
                <div>{priceFormatter(resultPrice)}원</div>
              </div>
              <div className={styles.resultText}>
                <div>총 배송비</div>
                <div>{priceFormatter(deliveryPrice)}원</div>
              </div>
            </div>
            <div>
              <div className={styles.resultPrice}>
                <div>총 주문금액</div>
                <div>{priceFormatter(resultPrice + deliveryPrice)}원</div>
              </div>
              <button className={styles.orderButton} type="button">
                주문하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPageSection;
